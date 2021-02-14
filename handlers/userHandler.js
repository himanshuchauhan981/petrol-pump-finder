const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { user } = require('../schemas');

const generateToken = (userId, accountType) => {
	let privateKey = process.env.JWT_KEY;
	let object = {
		userId: userId,
		type: accountType,
	};

	let token = jwt.sign(object, privateKey, { expiresIn: '1h' });
	return token;
};

const userHandler = {
	loginUser: async (email, password) => {
		let existingUser = await user.findOne({ email });
		if (existingUser) {
			let comparedPassword = bcrypt.compareSync(
				password,
				existingUser.password
			);
			if (comparedPassword) {
				let token = generateToken(existingUser._id, existingUser.accountType);
				return { status: 200, data: { token } };
			} else {
				return { status: 401, data: { msg: 'Incorrect credentials' } };
			}
		} else {
			return { status: 401, data: { msg: 'Incorrect credentials' } };
		}
	},

	updateUserProfile: async () => {},
};

module.exports = userHandler;
