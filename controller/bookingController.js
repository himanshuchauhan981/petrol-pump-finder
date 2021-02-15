const { bookingHandler } = require('../handlers');

const bookings = {
	createBooking: async (req, res) => {
		let bookingDetails = req.body;
		let { userId } = req.user;
		let response = await bookingHandler.createBooking(bookingDetails, userId);
		res.status(200).send();
	},

	getStations: async (req, res) => {
		let { latitude, longitude } = req.query;

		let response = await bookingHandler.showStations(latitude, longitude);
		res.status(response.status).send(response.data);
	},

	viewStationBooking: async (req, res) => {
		let stationId = req.params.stationId;

		let response = await bookingHandler.viewStationBooking(stationId);
		res.status(response.status).send(response.data);
	},
};

module.exports = bookings;
