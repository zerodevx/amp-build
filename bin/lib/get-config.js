const fs = require('fs-extra');
const path = require('path');

function getConfig() {
  const filename = path.join(process.cwd(), 'src', '_config', 'amp-build.config.json');
  return fs.readJsonSync(filename);
}

module.exports = getConfig();
