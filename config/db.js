const mongoose = require('mongoose');
const debug = require('debug')('server:db-config');

module.exports = async () => {
	try {
		const { connection } = await mongoose.connect(process.env.MONGO_URL);
		debug(`MongoDB running on ${connection.host}`);
		return connection;
	} catch (error) {
		debug(error.message);
		process.exit(1);
	}
};
