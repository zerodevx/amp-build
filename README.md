# amp-boilerplate

An opinionated [Google Accelerated Mobile Pages](https://www.ampproject.org/) site build.

Featuring:

* NPM Scripts for Tooling
* [Tailwind](https://tailwindcss.com/) as CSS Framework
* Development Server with [LiveReload](https://github.com/livereload/livereload-js)
* Full Build Minification via [PurgeCSS](https://github.com/FullHuman/purgecss), [HTMLMinifier](https://github.com/kangax/html-minifier) and [imagemin](https://github.com/imagemin/imagemin)
* AMP Validation


## Introduction

This is meant to be a starting point for building full AMPed websites.

Check out the demo [here](https://zerodevx.github.io/amp-boilerplate/dist/).


## Usage

1. Clone repo and install dependencies.

```
git clone https://github.com/zerodevx/amp-boilerplate
cd amp-boilerplate
npm i
```

2. Run the development server.

```
npm run dev
```

3. Develop your site from `/src` directory using AMP HTML and Tailwind.

4. Build your site.

```
npm run build
```

5. Built bundle is saved into `/dist` directory. Check it.

```
npm run serve:dist
```

6. Copy the files in `/dist` to your server and profit!


## License

MIT


## Contribute

Make an issue, fork the repo, and raise a PR.


