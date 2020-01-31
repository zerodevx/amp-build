#! /usr/bin/env node

const fs = require('fs-extra');
const deepmerge = require('deepmerge');
const c = require('ansi-colors');
const Listr = require('listr');
const args = require('yargs-parser')(process.argv.slice(2), {
  boolean: ['help', 'version', 'force']
});
const pkg = fs.readJSONSync(`${__dirname}/package.json`);
const help = `
${c.bold.black('VERSION:')}
  [amp-build] v${pkg.version}
  An opinionated Google AMP site build.

${c.bold.black('USAGE:')}
  $ amp-build [COMMAND]

${c.bold.black('COMMAND:')}
  init      ${c.gray('initialize a new project')}
  uprade    ${c.gray('upgrade an exisiting project')}
`;

(async () => {

  if (!process.argv.slice(2).length || args.help || args._[0] === 'help') {
    console.log(help);
    process.exit(0);
  }
  if (args.version) {
    console.log(`[amp-build] v${pkg.version}`);
    process.exit(0);
  }

  let tasks;

  switch (args._[0]) {

    case 'init':
      tasks = new Listr([
        {
          title: 'Check paths',
          skip: () => {
            if (args.force) {
              return 'Forced initialization';
            }
          },
          task: async () => {
            if (await fs.exists('src') || await fs.exists('bin')) {
              throw new Error(`/src or /bin directory already exists`);
            }
            if (!await fs.exists('package.json')) {
              throw new Error(`package.json does not exist`);
            }
          }
        },
        {
          title: 'Scaffold new project',
          task: async () => {
            await fs.copy(`${__dirname}/src`, 'src');
            await fs.copy(`${__dirname}/bin`, 'bin');
          }
        },
        {
          title: 'Copy boilerplate',
          task: async () => {
            await fs.copy('src/index.html', 'src/_config/boilerplate.html');
          }
        },
        {
          title: 'Update amp-build.config.json',
          task: async () => {
            const path = `src/_config/amp-build.config.json`;
            const file = await fs.readFile(path, 'utf-8');
            await fs.outputFile(path, file.replace(/{\$VERSION}/m, pkg.version), 'utf-8');
          }
        },
        {
          title: 'Update package.json',
          task: async () => {
            const deps = (() => {
              let out = {dependencies: {}};
              for (let key of pkg.ampBuildDependencies) {
                out.dependencies[key] = pkg.dependencies[key] || pkg.devDependencies[key];
              }
              return out;
            })();
            const userPkg = await fs.readJson('package.json');
            await fs.writeJson('package.json', deepmerge(userPkg, deps), {spaces: 2});
          }
        }
      ]);
      break;

    case 'upgrade':
      tasks = new Listr([
        {
          title: 'Success',
          task: () => Promise.resolve('Foo')
        },
        {
          title: 'Failure',
          task: () => Promise.reject(new Error('Bar'))
        }
      ]);
      break;

    default:
      console.log(`[amp-build] invalid command`);
      process.exit(1);

  }

  tasks.run().then(() => {
    console.log(`Done! Run 'npm install' to install dependencies.`);
  }).catch(() => {
    console.error(`[amp-build] tasks exited with errors`);
    process.exit(1);
  });

})();

