const express = require('express');
const multer = require('multer');

const { userController } = require('../controller');
const { multerMiddleware } = require('../middleware');

module.exports = () => {
	const router = express.Router();

	router.post('/login', userController.loginUser);

	// router.post('/profile', (req, res) => {
	// multerMiddleware.upload.single('profileImage')(req, res, function (err) {
	// 	if (err instanceof multer.MulterError) {
	// 		res
	// 			.status(413)
	// 			.send({
	// 				msg: 'Maximum file size exceeded. Max file size is limited to 3MB',
	// 			});
	// 	} else if (err) {
	// 		res.status(413).send({ msg: err.message });
	// 	} else if (!req.file) {
	// 		res.status(413).send({ msg: 'File is required' });
	// 	} else {
	// 		res.status(200).send({ msg: 'User photo uploaded' });
	// 	}
	// });
	// });

	router.post('/profile', userController.saveProfileData);

	return router;
};
