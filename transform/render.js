var excludeFields = ["icon","help","ui:position"];

// http://jsfiddle.net/KJQ9K/554/
function syntaxHighlight(json) {
    json = JSON.stringify(json, undefined, 4);
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    json = json.replace(/{/g, '').replace(/}/g, '');   // remove { and }
    json = json.replace(/[ ]*\,\n/g, '\n');   // remove end commas
    // console.log(json);
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
                match = match.replace(/\"([^(\")"]+)\":/g,"$1:");  // This removes the quotes around keys.
            } else {
                cls = 'string';
                // console.log(match);
                match = match.replace(/^\"|\"$/g,'');  // This removes the quotes.
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

module.exports = function(_,currentFileData, filesInCurrentFolder, allFiles) {
    var culledJson = _.omit(currentFileData, excludeFields);
    var prettyJson = syntaxHighlight(culledJson);
    return Promise.resolve(

        // http://jsfiddle.net/KJQ9K/554/
        '<style type="text/css">pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }'
        +'.string { color: green; }'
        +'.number { color: darkorange; }'
        +'.boolean { color: blue; }'
        +'.null { color: magenta; }'
        +'.key { color: red; }'
        +'</style>'

        +'<div><h1>'+currentFileData.name+'</h1></div>\n'
        +'<hr>\n'
        +'<div>\n'
        // +'help: '
        // +JSON.stringify(currentFile.help, null, 2)
        +currentFileData.help
        +'</div>\n'
        +'<hr>\n'
        +'<pre>\n'
        +prettyJson
        +'</pre>\n'
        // +'<div>'
        // +JSON.stringify(filesInCurrentFolder, null, 2)
        // +'</div>'
        // +'</div>\n'
        // +'<div>'
        // +JSON.stringify(allFiles, null, 2)
        // +'</div>'
    );
};

