const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

let { MONGO_HOSTNAME, MONGO_PORT, MONGO_DATABASE } = process.env;

const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DATABASE}`;

mongoose.connect(url, (err, conn) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Mongoose connection is successful');
	}
});
