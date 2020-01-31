const assert = require('assert');
const fs = require('fs-extra');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

class CustomLoader extends jsdom.ResourceLoader {
  fetch(url, options) {
    if (url === 'fetch.js') {
      return Promise.resolve(Buffer.from(
        fs.readFileSync(`${process.cwd()}/test/fetch.txt`, 'utf-8')
      ));
    }
    if (url === '/_scripts/insert-snippet.js') {
      return Promise.resolve(Buffer.from(
        fs.readFileSync(`${process.cwd()}/src/_scripts/insert-snippet.js`, 'utf-8')
      ));
    }
    if (url === '/_snippets/test.html') {
      console.log('works');
      return Promise.resolve(Buffer.from(`<script>console.log('ok');</script>`));
    }
    super.fetch(url, options);
  }
}

describe('insert-snippet', function() {

  /*
  let server;

  beforeEach(function() {
    server = sinon.createFakeServer();
    server.respondWith('GET', '/_scripts/insert-snippet.js', [
      200,
      {'Content-Type': 'text/javascript'},
      fs.readFileSync(`${process.cwd()}/src/_scripts/insert-snippet.js`, 'utf-8')
    ]);
  });

  afterEach(function() {
    server.restore();
  });
  */

  it('should append scripts into head', function() {

    const dom = new JSDOM(`
<!DOCTYPE html><html><head>
  <script src="fetch.js"></script>
  <script snippet="test.html" src="/_scripts/insert-snippet.js"></script>
</head><body></body></html>`, {
      runScripts: 'dangerously',
      resources: new CustomLoader
    });



  });

});


