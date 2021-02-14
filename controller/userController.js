const multer = require('multer');

const { userHandler } = require('../handlers');
const { multerMiddleware } = require('../middleware');

const user = {
	loginUser: async (req, res) => {
		let { email, password } = req.body;

		let response = await userHandler.loginUser(email, password);
		res.status(response.status).send(response.data);
	},

	saveProfileData: async (req, res) => {
		multerMiddleware.upload.single('profileImage')(req, res, async (err) => {
			if (err instanceof multer.MulterError) {
				res.status(413).send({
					msg: 'Maximum file size exceeded. Max file size is limited to 3MB',
				});
			} else if (err) {
				res.status(413).send({ msg: err.message });
			} else if (!req.file) {
				res.status(413).send({ msg: 'File is required' });
			} else {
				let { filename } = req.file;
				let { userId } = req.user;
				let response = await userHandler.saveUserProfile(filename, userId);
				res.status(response.status).send({ msg: response.msg });
			}
		});
	},
};

module.exports = user;
