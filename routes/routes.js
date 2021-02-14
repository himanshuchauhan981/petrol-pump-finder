const express = require('express');

const { userController, bookingController } = require('../controller');
const { authMiddleware } = require('../middleware');

module.exports = () => {
	const router = express.Router();

	router.post('/login', userController.loginUser);

	//Saving profile image

	router.post('/profile', authMiddleware, userController.saveProfileData);

	//Create new booking for filling vehicle

	router.post('/booking', authMiddleware, bookingController.createBooking);

	//Get nearest stations for booking

	router.get('/stations', authMiddleware, bookingController.getStations);

	return router;
};
