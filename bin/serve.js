const server = require('live-server');
const execa = require('execa');
const chokidar = require('chokidar');
const config = require('./lib/get-config');

// Watch tailwind files and rebuild on change
function watch() {
  chokidar.watch([config.tailwind.cssPath, config.tailwind.configPath])
    .on('change', () => {
      execa('npx', ['tailwind', 'build', config.tailwind.cssPath, '-c', config.tailwind.configPath, '-o', 'src/_styles/styles.css'])
      .stdout
      .pipe(process.stdout);
    });
}

if (config.tailwind.enabled) {
  watch();
}

server.start({
  port: config.server.port,
  host: config.server.host,
  root: config.server.root,
  ignore: config.server.ignore
});
