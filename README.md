# amp-build

An opinionated [Google Accelerated Mobile Pages](https://www.ampproject.org/) site build.

Featuring:

* NPM Scripts for Tooling
* [Tailwind](https://tailwindcss.com/) as CSS Framework
* Development Server with [LiveReload](https://github.com/livereload/livereload-js)
* Full Build Minification via [PurgeCSS](https://github.com/FullHuman/purgecss), [HTMLMinifier](https://github.com/kangax/html-minifier) and [imagemin](https://github.com/imagemin/imagemin)
* AMP Validation


## Introduction

This is meant to be a starting point for building full AMPed websites.

Check out the demo [here](https://zerodevx.github.io/amp-build/dist/).


## Install

Clone the repo and install dependencies.

```
git clone https://github.com/zerodevx/amp-build
cd amp-build
npm i
```


## Develop

Launch the development server.

```
npm run dev
```

This opens up a new browser window pointing to `http://localhost:8000/` which serves files from the `/src` directory.


### HTML

Create your AMP-HTML structure and code directly in the `/src` directory. You can use the `src/index.html` file as a starting point.

Place images into the `/src/images` directory and reference to them in your HTML using [relative URLs](https://www.w3.org/TR/WD-html40-970917/htmlweb.html#h-5.1.2).

During development, a temporary external stylesheet `/styles/_styles.css` should be loaded. This is for convenience - it contains the whole library of Tailwind classes to allow rapid development. Don't worry, this will be automatically minified/transformed during build.

Additional stuff (like `robots.txt`) can also be placed inside the `/src` directory and they will be copied over during build.


### CSS

AMP with Tailwind is a match made in heaven. Design your site using Tailwind utility classes. Default configuration can be changed via `/tailwind.js`. Custom component classes, if any, can be declared in `/src/styles/tailwind.css`.

You can also place custom AMP classes in the `index.html` file directly at the end of the `<style amp-custom>` tag.


## Build

Build your distribution bundle.

```
npm run build
```

This automates a few things. It removes your unused CSS using [Purgecss](https://github.com/FullHuman/purgecss), inlines your CSS into the `<style amp-custom>` tags per [AMP specs](https://www.ampproject.org/docs/fundamentals/spec), minifies your HTML and CSS via [HTMLMinifier](https://github.com/kangax/html-minifier), optimizes your `/images` files via [imagemin](https://github.com/imagemin/imagemin), and validates your distribution using the official [Google amphtml-validator](https://www.npmjs.com/package/amphtml-validator).

The build is written into the `/dist` directory. You can optionally serve from `/dist` to check that everything is ok.

```
npm run serve:dist
```

The `/dist` directory is ready to be deployed into any static server.


## License

MIT


## Contribute

Suggestions are welcome! Or make an issue, fork the repo, and raise a PR.

