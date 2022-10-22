const webpack = require('webpack');
const path = require('path');

const config = {
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, 'public/js'),
		filename: 'bundle.js',
	},
};

module.exports = config;
