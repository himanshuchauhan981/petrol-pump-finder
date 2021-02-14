const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const { routes } = require('../routes');

require('../db').connection;

const host = process.env.HOST;
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes());

app.listen(port, host, (err) => {
	if (err) console.log(err);
	else console.log(`Running on ${host}:${port}`);
});
