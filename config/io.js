const debug = require('debug')('server:io-config');

module.exports = (io) => {
	const rooms = [];

	io.on('connect', (socket) => {
		socket.on('register', (username) => {
			const room = rooms.find((roomy) => roomy.username === username);
			if (!room) {
				rooms.push({ username });
			}
			socket.join(username);
			socket.emit('registered', true);
		});

		socket.on('share', (state, data) => {
			const { username } = rooms.find(
				(room) => room.username === state.username
			);

			debug(data);

			io.to(username).emit('file-shared', data.file);
		});

		socket.on('disconnect', () => {
			socket.disconnect(true);
		});
	});
};
