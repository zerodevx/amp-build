// Syntax: node scaffold-page <URL> <optional: layout>
// Example: node scaffold-page /about-us/our-mission section
// In this example, a new directory is created at `src/site/about-us/our-mission/`,
// and `src/layouts/section.html` is copied to `src/site/about-us/our-mission/index.html`.

const exec = require('child_process').execSync;
const args = process.argv.slice(2);

let dir = `src/site${args[0] ? args[0] : ''}`;
let layout = `src/layouts/${args[1] || 'default'}.html`;
let cmds = [];

// Copy the file
cmds.push(`npx shx mkdir -p ${dir}`);
cmds.push(`npx shx cp -f ${layout} ${dir}/index.html`);

// Update the canonical URL
cmds.push(`npx rr '<link rel="canonical" href="\.">' '<link rel="canonical" href="http://localhost:8000/${dir}/">' '${dir}/index.html'`);

// Execute commands
for (let a = 0; a < cmds.length; a++) {
  exec(cmds[a]);
}
