const multer = require('multer');

const { userHandler } = require('../handlers');
const { multerMiddleware } = require('../middleware');

const user = {
	loginUser: async (req, res) => {
		let email = 'ramlal101@gmail.com';
		let password = 'ramlal';

		//Here dummy data is used to login user otherwise data comes from req.body

		let response = await userHandler.loginUser(email, password);
		res.status(response.status).send(response.data);
	},

	saveProfileData: async (req, res) => {
		multerMiddleware.upload.single('profileImage')(req, res, function (err) {
			if (err instanceof multer.MulterError) {
				res.status(413).send({
					msg: 'Maximum file size exceeded. Max file size is limited to 3MB',
				});
			} else if (err) {
				res.status(413).send({ msg: err.message });
			} else if (!req.file) {
				res.status(413).send({ msg: 'File is required' });
			} else {
				res.status(200).send({ msg: 'User photo uploaded' });
			}
		});
	},
};

module.exports = user;
