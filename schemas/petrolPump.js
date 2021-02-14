const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const petrolPumpSchema = new Schema({
	address: String,
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
	state: String,
	city: String,
});

module.exports = mongoose.model('petrolPump', petrolPumpSchema);
