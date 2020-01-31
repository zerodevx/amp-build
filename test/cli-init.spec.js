const assert = require('assert');
const fs = require('fs-extra');
const execa = require('execa');

describe('cli-init', async function() {

  const pkg = {
    'name': 'test-site',
    'version': '2.0.0',
    'description': '',
    'main': 'index.js',
    'scripts': {
      'test': 'echo \"Error: no test specified\" && exit 1'
    },
    'author': 'Jason Lee <jason@zerodevx.com>',
    'license': 'UNLICENSED'
  };

  before(async function() {
    await fs.mkdirp('test/tmp');
    process.chdir('test/tmp');
  });

  after(async function() {
    process.chdir('../..');
    fs.remove('test/tmp');
  });

  describe('standard cases', async function() {

    async function test() {
      try {
        await execa('node', ['../../cli', 'init'])
      } catch(err) {
        throw new Error(err);
      }
    }

    it('should create src, _config, _scripts, _styles, boilerplate', async function() {
      await fs.outputJson('package.json', pkg, {spaces: 2});
      await execa('node', ['../../cli', 'init']);
      assert.ok(await fs.exists('src'));
      assert.ok(await fs.exists('src/_config'));
      assert.ok(await fs.exists('src/_scripts'));
      assert.ok(await fs.exists('src/_styles'));
      assert.ok(await fs.exists('src/_config/boilerplate.html'));
    });

    it('should update version', async function() {
      const config = await fs.readJson('src/_config/amp-build.config.json');
      assert.notEqual(config.version, '${VERSION}');
    });

    it('should error if src already exists', async function() {
      await assert.rejects(test);
    });

    it('should error if no package.json', async function() {
      await fs.remove('src');
      await fs.remove('bin');
      await fs.remove('package.json');
      await assert.rejects(test);
    });

  });

  describe('package.json merges', async function() {

    afterEach(async function() {
      await fs.remove('src');
      await fs.remove('bin');
    });

    it('should add dependencies key if not exist', async function() {
      await fs.outputJson('package.json', pkg, {spaces: 2});
      await execa('node', ['../../cli', 'init', '--force']);
      const result = await fs.readJson('package.json');
      assert.notEqual(typeof result.dependencies, 'undefined');
    });

    it('should add package key/value if not exist', async function() {
      const newPkg = Object.assign({}, pkg, {
        dependencies: {
          test: '0.1.0'
        }
      });
      await fs.outputJson('package.json', newPkg, {spaces: 2});
      await execa('node', ['../../cli', 'init']);
      const result = await fs.readJson('package.json');
      assert.equal(result.dependencies.test, '0.1.0');
      assert.ok(Object.keys(result.dependencies).length > 1);
    });

    it('should update package key/value if exist', async function() {
      const newPkg = Object.assign({}, pkg, {
        dependencies: {
          test: '0.1.0',
          execa: '0.2.0'
        }
      });
      await fs.outputJson('package.json', newPkg, {spaces: 2});
      await execa('node', ['../../cli', 'init']);
      const result = await fs.readJson('package.json');
      assert.equal(result.dependencies.test, '0.1.0');
      assert.notEqual(result.dependencies.execa, '0.2.0');
    });

  });





});
