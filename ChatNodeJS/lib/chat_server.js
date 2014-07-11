/**
 * @author Sam Haycraft
 */

var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var current Room = {};

exports.listen = function(server) {
	io = socketio.listen(server);
	io.set('log level', 1);
	io.sockets.on('connection', function(socket {
		guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
		joinRoom(socket, 'Lobby');
		
		handleMessageBroadcasting(socket, nickNames);
		handleNameChangeAttempts(socket, nickNames, namesUsed);
		
		socket.on('rooms', function() {
			socket.emit('rooms', io.sockets.manager.rooms);
		});
		
		handleClientDisconnection(socket, nickNames, namesUsed);		
		
	});
}