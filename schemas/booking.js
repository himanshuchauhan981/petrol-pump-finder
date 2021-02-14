const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
	},
	stationId: {
		type: Schema.Types.ObjectId,
	},
	vehicles: [
		{
			vehicleNo: {
				type: String,
			},
			filling: {
				type: String,
			},
			bookingDate: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

module.exports = mongoose.model('booking', bookingSchema);
