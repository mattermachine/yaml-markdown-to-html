module.exports = function(currentFile, filesInCurrentFolder, allFiles) {
  return Promise.resolve(
    '<div>'
    +'name: '
      +JSON.stringify(currentFile.name, null, 2)
    +'</div>'
    +'<div>'
      +'help: '
      +JSON.stringify(currentFile.help, null, 2)
    +'</div>'
  );
};

