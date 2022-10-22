const debug = require('debug')('server');
const { Server } = require('socket.io');
const { createServer } = require('http');
const app = require('./app');

const server = createServer(app);
const io = new Server(server, {
	maxHttpBufferSize: 20 * 1e6,
});

// const db = require('./config/db');

(async () => {
	// const connection = await db();
	require('./config/io')(io);

	const port = process.env.PORT || 5000;
	server.listen(port, () => {
		debug(`Server running on port ${port}`);
	});
})();
