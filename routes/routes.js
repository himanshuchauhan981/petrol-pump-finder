const express = require('express');

const { userController } = require('../controller');
const { auth } = require('../middleware');

module.exports = () => {
	const router = express.Router();

	router.post('/login', userController.loginUser);

	router.post('/profile', auth, userController.saveProfileData);

	return router;
};
