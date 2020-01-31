(function(window, document) {

  var script = document.currentScript;
  var snippet = script.getAttribute('snippet');
  if (!snippet) {
    console.error('No corresponding `snippet` attribute set!');
    return;
  }
  var url = '/_snippets/' + snippet;

  window.fetch(url)
    .then(function(response) { return response.text(); })
    .then(function(html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      doc.querySelectorAll('script').forEach(function(node) {
        var el = document.createElement('script');
        var attr = node.attributes;
        for (var a = 0; a < attr.length; a++) {
          el.setAttribute(attr[a].nodeName, attr[a].nodeValue);
        }
        document.head.appendChild(el);
      });
      doc.querySelectorAll('head>*:not(script),body>*:not(script)').forEach(function(node) {
        script.parentNode.insertBefore(node, script);
      });
      script.remove();
    });

}(window, document));
