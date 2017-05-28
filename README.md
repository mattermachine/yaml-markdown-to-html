yaml-to-html
=======================

render a folder of yaml files to html, recursively

Installation
------------

```bash
npm i yaml-to-html
```

Usage
-----

The command line interface accepts three folders:

```bash
# build
yaml-to-html <yaml> <html> <transform>

# watch
yaml-to-html --watch <yaml> <html> <transform>
```

`<yaml>` is the source folder that contains the yaml files to render. `<html>` is the destination folder that will contain the rendered html files. `<transform>` is the folder, which contains at least a `render.js` and may contain a `post-render.js`, as well as other files that are used to render the yaml files to html. By default the CLI will look for a folder with the same name as the argument if omitted.

`transform/render.js` is called once per file and gets an object with its parsed meta data and the raw markdown string, a collection of all other files in the current directory plus index pages of folders in the current directory and a collection of all files. It should return a Promise that fulfills with the rendered HTML.

__example:__ `transform/render.js`

```js
module.exports = function(currentFile, filesInCurrentFolder, allFiles) {
  return Promise.resolve(
    '<code>'
      +JSON.stringify(currentFile, null, 2)+' of '+allFiles.length
      +'\n'
      +JSON.stringify(filesInCurrentFolder, null, 2)
    +'</code>'
  );
};
```

`transform/postRender.js` receives a collection of rendered files including a `renderedPath` property after all files have been rendered and should return a Promise that fulfills whenever it is done.

__example:__ `transform/post-render.js`

```js
module.exports = function postRender(renderedFiles) {
  console.log('number of rendered files: %i', renderedFiles.length);
  return Promise.resolve(renderedFiles);
};
```

LICENSE
-------

The MIT License (MIT) Maximilian Hoffmann

[1]: http://img.shields.io/npm/v/yaml-markdown-to-html.svg?style=flat
[2]: https://www.npmjs.org/package/yaml-markdown-to-html
[3]: http://img.shields.io/travis/maxhoffmann/yaml-markdown-to-html.svg?style=flat
[4]: https://travis-ci.org/maxhoffmann/yaml-markdown-to-html
