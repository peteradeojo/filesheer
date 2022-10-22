const express = require('express');
const path = require('path');

const app = express();

if (app.get('env') !== 'production') {
	require('dotenv').config();
	app.use(require('morgan')('dev'));
}

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public/')));

app.use('/', require('./routes/index')());

module.exports = app;
