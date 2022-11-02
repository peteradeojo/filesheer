const debug = require('debug')('server:io-config');

module.exports = (io) => {
	const rooms = [];

	io.on('connect', (socket) => {
		socket.on('register', (username) => {
			rooms.forEach((room) => {
				if (room.username !== username) {
					socket.leave(room.username);
				}
			});

			const room = rooms.find((roomy) => roomy.username === username);
			if (!room) {
				rooms.push({ username });
			}
			socket.join(username);
			socket.emit('registered', username);
		});

		socket.on('share', (state, data) => {
			if (!state.username) {
			}
			const { username } = rooms.find((room) => room.username === state.username);

			io.to(username).emit('file-shared', data.file);
		});

		socket.on('disconnect', () => {
			socket.disconnect(true);
		});
	});
};
