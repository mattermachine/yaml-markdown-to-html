module.exports = function postRender(renderedFiles) {
  console.log('number of rendered files: %i', renderedFiles.length);
  return Promise.resolve(renderedFiles);
};

