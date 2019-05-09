# amp-build

An opinionated [AMP](https://amp.dev) [PWA](https://developers.google.com/web/progressive-web-apps/) site build.

Works like a simple static site generator that outputs AMP-validated pages which are indexed by search engines and acts as an entry point to a complete PWA app.

Features:

* Super optimized build.

* HTML snippets for reusability.

* Tailwindcss v0 as utility CSS.

* PurgeCSS v1 to remove unused CSS.

* Workbox v4 for offline goodness.

* Baked in `amp-font` with Material Icons.

* Nested navigation menu.

* App Shell PWA architecture. (WIP)

## Install

Clone this repo.

`git clone https://github.com/zerodevx/amp-build`

Enter directory.

`cd amp-build`

Install dependencies.

`npm install`

## Initialise

Scaffold the `src` directory.

`npm run scaffold`

## Upgrade

To upgrade `amp-build` to a newer version, simply do a `git pull`.




## Directory structure

```
src/
  site/           -> site structure goes here
  layouts/        -> page templates go here
  images/         -> images go here
  snippets/       -> reusable HTML chunks go here
  styles/         -> for tailwind to generate styles.css
  scripts/        -> insert-snippet.js
  pwa/            -> PWA-related stuff
```

## Site

This is designed to work without compilation. Simply run any http server off the root directory at port 8000.

`npm run serve`

Visit your page at `http://localhost:8000/src/site`.

Reference all links by their *absolute* url, for example:

`<a href="http://localhost:8000/src/site/giraffes/">What are giraffes?</a>`

## Images

All images go into `src/images`. Reference all images by their *absolute* url, for example:

`<amp-img src="http://localhost:8000/src/images/short-giraffe.jpg" width="500" height="500" layout="responsive"></amp-img>`

Add your app icons in the following sizes:

```
src/images/icons/
  favicon.ico
  icon-72x72.png
  icon-96x96.png
  icon-128x128.png
  icon-152x152.png
  icon-192x192.png
  icon-384x384.png
  icon-512x512.png
```

`src/images/icons/favicon.ico` will be moved into root during build.

Imagemin takes a long time, so minify the images in `src/images/` once using:

`npm run build:images`

During build, the `src/images/` directory will be copied directly without modification.

## Layouts

By default, new pages are generated from `src/layouts/default.html`. This serves as the template whenever a new page is scaffolded.

Add a new page:

`npm run scaffold:page -- <url> <optional: template>`

For example:

`npm run scaffold:page -- /about/services section`

This copies `src/layouts/section.html` to `src/site/about/services/index.html`. If the directory does not exist, it will be created.

## Snippets

Reusable HTML blocks go into snippets. Insert snippets into page using a `script` tag, `snippet` attribute, and source to `src/scripts/insert-snippet.js`. For example:

`<script snippet="header.html" src="http://localhost:8000/src/scripts/insert-snippet.js"></script>`

## Default Snippets

```
snippets/header.html          -> Header
snippets/footer.html          -> Footer
snippets/amp-components.html  -> Optional default amp-components for every page
```

## Styles

Use tailwind classes to construct your page. If you wish to make changes to `src/styles/tailwind.js` - for example to add more functional classes - edit that file, then run the following to regenerate `styles.css`:

`npm run build:tailwind`

## PWA

Update `manifest.json` at `src/pwa/` to configure how your app looks like on homescreen.


# TO-DOs

## App Shell

At the moment, [Amp Shadow](https://github.com/ampproject/amphtml/blob/master/spec/amp-shadow-doc.md) does not seem to be working very well, and it's not clear if AMP devs are continuing work on it.


## Config

Set global configuration at `src/config.json`.

| Key               | Description                          | Value                        |
|-------------------|--------------------------------------|------------------------------|
| themeColor        | Sets the `theme-color` meta tag.     | Hexadecimal color code       |

