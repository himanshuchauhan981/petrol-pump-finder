const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stationSchema = new Schema({
	address: {
		type: String,
		required: true,
	},
	location: {
		type: {
			type: String,
			enum: ['Point'],
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
		},
	},
	state: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
});

module.exports = mongoose.model('station', stationSchema);
