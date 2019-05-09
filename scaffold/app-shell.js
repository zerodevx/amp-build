(function(window, document) {

  var loader = document.querySelector('.loader');
  var runtimes = ['amp-sidebar', 'amp-install-serviceworker'];
  var positions = {};
  var queries = new URLSearchParams(window.location.search);
  var session = { id: Date.now(), count: 0 };
  var currentPage = queries.get('init') || window.location.href;

  function toggleLoader(active) {
    if (typeof active === 'undefined') {
      loader.classList.toggle('hide');
    } else if (active) {
      loader.classList.remove('hide');
    } else {
      loader.classList.add('hide');
    }
  }

  function updateRuntimes(scripts) {
    for (var a = 0, ce; a < scripts.length; a++) {
      ce = scripts[a].getAttribute('custom-element');
      if (runtimes.indexOf(ce) === -1) {
        runtimes.push(ce);
        document.head.appendChild(scripts[a]);
      }
    }
  }

  function fetchDoc(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'document';
      xhr.setRequestHeader('Accept', 'text/html');
      xhr.onreadystatechange = function() {
        if (xhr.readyState < 2) { return; } //STATUS_RECEIVED
        if (xhr.status < 100 || xhr.status > 599) {
          reject(new Error('Unknown HTTP status ' + xhr.status));
          return;
        }
        if (xhr.readyState === 4) { //COMPLETE
          if (xhr.responseXML) {
            if (xhr.status === 200) {
              resolve(xhr.responseXML);
            } else {
              reject(new Error('Status is not 200'));
            }
          } else {
            reject(new Error('No xhr.responseXML'));
          }
        }
      };
      xhr.onerror = function() { reject(new Error('Network failure')); };
      xhr.onabort = function() { reject(new Error('Request aborted')); };
      xhr.send();
    });
  }

  // If `isReplace` then performs a replacement operation on browser history
  function updateHistory(url, title, isReplace) {
    if (window.history) {
      var state = {
        url: url,
        session: session.id,
        count: session.count++
      };
      if (isReplace) {
        Object.assign({}, window.history.state, {
          url: window.location.href,
          random: Math.random(),
          source: "swup",
      }),
        window.history.replaceState(Object.assign({}, window.history.state, state), title, url);
      } else {
        window.history.pushState(state, title, url);
      }
      document.title = title;
    }
  }

  // Change page and returns the new page title
  function changePage(url, firstRun) {
    return fetchDoc(url)
      .then(function(doc) {
        updateRuntimes(doc.querySelectorAll('script[custom-element]'));
        var oldPage = document.querySelector('main');
        var newPage = doc.querySelector('main');
        // Save old page scroll position
        positions[currentPage] = oldPage.scrollTop;
        currentPage = url;
        if (firstRun) {
          oldPage.insertAdjacentElement('afterend', newPage);
          oldPage.remove();
        } else {
          // Begin transition to the new page
          newPage.classList.add('hide');
          oldPage.insertAdjacentElement('afterend', newPage);
          // Update newPage scroll position
          newPage.scrollTo(0, positions[url] || 0);
          window.setTimeout(function() {
            oldPage.classList.add('hide');
            newPage.classList.remove('hide');
          }, 25);
          window.setTimeout(function() {
            oldPage.remove();
          }, 225);
        }
        return doc.title;
      });
  }

  function hijackLinks(ev) {
    // Ensure meta-key is not pressed
    if (ev.metaKey) { return; }
    var paths = ev.path || ev.composedPath();
    // Anchors should only be nested at most once
    if (paths.length < 2) { return; }
    var link;
    if (paths[1].tagName === 'A') {
      link = paths[1];
    }
    if (paths[0].tagName === 'A') {
      link = paths[0];
    }
    if (!link) { return; }
    // Check that link from same origin
    if (link.origin !== window.location.origin) { return; }
    // Check that link is a pagelink
    //var parts = link.pathname.split('/');
    //if (parts[parts.length - 1] !== '' || parts[parts.length - 1] !== 'index.html') { return; }

    ev.preventDefault();
    // Squelch if link is to the same page
    if (link.href === currentPage) { return; }
    toggleLoader(true);
    changePage(link.href)
      .then(function(title) {
        toggleLoader(false);
        updateHistory(link.href, title);
      })
      .catch(function(err) {
        toggleLoader(false);
        console.log(err);
      });
  }

  function popstateHandler(ev) {
    // Check if popstate event is ours.
    if (!ev.state.session) { return; }
    // Squelch if url is currentPage. This fixes bug in amp-sidebar where it fires a popstate on close.
    if (ev.state.url === currentPage) { return; }
    // Check that change is to same origin.
    var el = document.createElement('a');
    el.href = ev.state.url;
    if (el.origin !== window.location.origin) { return; }
    toggleLoader(true);
    changePage(ev.state.url)
      .then(function(title) {
        toggleLoader();
        updateHistory(ev.state.url, title, true);
      })
      .catch(function(err) {
        toggleLoader();
        console.log(err);
      });
  }

  window.addEventListener('click', hijackLinks);
  window.addEventListener('popstate', popstateHandler);
  changePage(currentPage, true)
    .then(function(title) {
      updateHistory(currentPage, title, true);
    })
    .catch(function(err) {
      console.log(err);
    });

}(window, document));
