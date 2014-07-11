/**
 * @author Sam Haycraft
 */

var http = require ('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

function send404(response, path){
	console.log('sending 404, ' + path);
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404: resource not found you fucking asshole');
	response.end();
}

function sendFile(response, filePath, fileContents) {
	response.writeHead(
		200,
		{'Content-Type': mime.lookup(path.basename(filePath))}
	);
	response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
	if (cache[absPath]) {
		console.log('found in cache, path = ' + absPath);
		sendFile(response, absPath, cache[absPath]);
	}
	else {
		console.log('not in cache, path = ' + absPath);
		fs.exists(absPath, function(exists) {
			if (exists) {
				fs.readFile(absPath, function(err, data) {
					if (err) {
						send404(response, absPath);
					}
					else {
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			}
			else {
				send404(response, absPath);
			}
		});
	}
}

var server = http.createServer(function(request,response) {
	console.log('new connection');
	var filePath = false;
	if (request.url == '/') {
		filePath = 'public/index.html';
	}
	else {
		filePath = 'public' + request.url;
	}
	var absPath = './' + filePath;
	serveStatic(response, cache, absPath);
});
server.listen(3000, function() {
	console.log("Server listening on port 3000.");
});
