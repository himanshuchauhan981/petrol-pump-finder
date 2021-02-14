const { station, booking } = require('../schemas');

const bookings = {
	createBooking: async (bookingDetails, userId) => {
		let vehicleDetails = bookingDetails.vehicles;
		for (let i = 0; i < vehicleDetails.length; i++) {
			let existingBookingDetail = await booking.findOne({
				vehicles: { $elemMatch: { vehicleNo: vehicleDetails[i].vehicleNo } },
			});
			if (existingBookingDetail) {
				await booking.updateOne(
					{ 'vehicles.vehicleNo': vehicleDetails[i].vehicleNo },
					{ $set: { 'vehicles.$.filling': vehicleDetails[i].filling } },
					{ multi: true }
				);
			} else {
				let existingBookingDetail = await booking.findOne({ userId });
				if (existingBookingDetail) {
					await booking.updateOne(
						{ userId },
						{ $push: { vehicles: vehicleDetails[i] } }
					);
				} else {
					let bookingObj = new booking({
						userId,
						stationId: bookingDetails.stationId,
						vehicles: vehicleDetails[i],
					});
					await bookingObj.save();
				}
			}
		}
	},

	showStations: async (latitude, longitude) => {
		let stations = await station
			.find({
				location: {
					$geoWithin: {
						$centerSphere: [[latitude, longitude], 200 / 3963.2],
					},
				},
			})
			.select({ location: 0 });

		if (stations.length === 0)
			return { status: 200, data: { msg: 'No nearest stations available' } };
		else return { status: 200, data: stations };
	},
};

module.exports = bookings;
