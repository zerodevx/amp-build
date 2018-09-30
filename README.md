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


## Install

Clone the repo and install dependencies.

```
git clone https://github.com/zerodevx/amp-boilerplate
cd amp-boilerplate
npm i
```


## Develop

Launch the development server.

```
npm run dev
```

This opens up a new browser window pointing to `http://127.0.0.1:8000/` which serves from the `/src` directory.


## Styling

AMP with Tailwind is a match made in heaven. Create your site design using Tailwind utility classes. Default configuration can be changed via `/tailwind.js`. Custom classes, if any, can be declared in `/src/styles/tailwind.css`.


## Build

Build your distribution bundle.

```
npm run build
```

The build is written into the `/dist` directory. You can optionally serve from `/dist` to check that everything is ok.

```
npm run serve:dist
```

The `/dist` directory is ready to be deployed into any static server.


## License

MIT


## Contribute

Make an issue, fork the repo, and raise a PR.


