var parser = require('xml2json');
var read = require('read-file');
var writeFile = require('write-file');
var fs = require('fs');

var src = process.argv[2];
var dst = src.substring(0, src.lastIndexOf('.')) + '.json';

read(src, 'utf8', function(err, content) {
    if (err) return console.log(err);
    var json = parser.toJson(content);
    var obj = JSON.parse(json);


    var collection = [];
    if (obj.miv) collection = obj.miv.meetpunt;
    if (obj.mivconfig) collection = obj.mivconfig.meetpunt;

    collection.forEach(function (item) {
        fs.appendFile(dst, JSON.stringify(item) + '\n', function (err) {
            if (err) return console.log("ERROR: " + err);
        });
    });
});
