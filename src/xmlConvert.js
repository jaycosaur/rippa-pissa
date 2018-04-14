var convert = require('xml-js');
var json = require('fs').readFileSync('./data/toiletmapexport180401090000.xml', 'utf8');
var options = {ignoreComment: true, spaces: 4};
var result = convert.xml2json(json, options);
console.log(result);