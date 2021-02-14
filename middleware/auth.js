const jwt = require('jsonwebtoken');
const { user } = require('../schemas');

const roleAuthentication = async (payload) => {
	let userData = await user.findById(payload.userId).select({ accountType: 1 });

	return userData.accountType === payload.accountType;
};

const auth = async (req, res, next) => {
	const authorizationHeader = req.headers.authorization;
	if (authorizationHeader) {
		const token = authorizationHeader.split(' ')[1];
		let jwtKey = process.env.JWT_KEY;
		try {
			//Validate Token
			let validatedToken = jwt.verify(token, jwtKey);

			//Validate user role
			let validatedRole = roleAuthentication(validatedToken);
			if (validatedRole) {
				req.user = validatedToken;
				next();
			} else res.status(401).send({ msg: 'Invalid token' });
		} catch (err) {
			res.status(401).send({ msg: 'Invalid token' });
		}
	}
};

module.exports = auth;
