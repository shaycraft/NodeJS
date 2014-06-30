/**
 * @author Sam Haycraft
 */

var http = require ('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

function send404(response){
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404: resource not found you fucking asshole');
	response.end();
}

function sendFile(response, filePath, fileContents) {
	response.writeHead(
		200,
		{'Content-Type': mime.lookup(path.basename(filePath))}
	);
}

function 