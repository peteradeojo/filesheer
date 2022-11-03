const debug = require('debug')('server:io-config');

module.exports = (io) => {
	const rooms = [];

	io.on('connect', (socket) => {
		socket.on('register', (username) => {
			const room = rooms.find((roomy) => roomy.username === username);
			if (room?.count >= 16) {
				socket.emit('fail', { message: 'Too many users on this channel' });
				return undefined;
			}

			if (!room) {
				rooms.push({ username, count: 1 });
			} else {
				room.count += 1;
			}

			rooms.forEach((room) => {
				if (room.username !== username) {
					socket.leave(room.username);
				}
			});

			socket.join(username);
			socket.emit('registered', username);
		});

		socket.on('share', (state, data) => {
			if (!state.username) {
				socket.emit('fail', { message: 'Invalid username' });
			}
			const { username } = rooms.find((room) => room.username === state.username);

			io.to(username).emit('file-shared', data.file);
		});

		socket.on('disconnect', () => {
			socket.disconnect(true);
		});
	});
};
