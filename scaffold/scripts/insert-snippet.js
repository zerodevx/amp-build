(function(window, document) {

  var script = document.currentScript;
  var origin = window.location.origin;
  var snippet = script.getAttribute('snippet');
  if (!snippet) {
    console.error('No corresponding `snippet` attribute set!');
    return;
  }
  var url = origin + '/src/snippets/' + snippet;

  window.fetch(url)
    .then(function(response) { return response.text(); })
    .then(function(html) {
      // For default amp-components, we need to manually create the DOM script node and insert it.
      if (snippet === 'amp-components.html') {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var nodes = doc.querySelectorAll('script');
        nodes.forEach(function(node) {
          var el = document.createElement('script');
          var attr = node.attributes;
          for (var a = 0; a < attr.length; a++) {
            el.setAttribute(attr[a].nodeName, attr[a].nodeValue);
          }
          document.head.appendChild(el);
        });
      } else {
        script.insertAdjacentHTML('afterend', html);
        script.remove();
      }
    });

}(window, document));
