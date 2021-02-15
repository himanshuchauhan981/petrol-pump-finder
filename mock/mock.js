const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');

const { station, user } = require('../schemas');

const url = `mongodb://127.0.0.1:27017/petrol_pump`;

mongoose.connect(url, (err, conn) => {
	if (err) {
		console.log('Mongo error ', err);
	} else {
		console.log('Mongoose Connection is Successful');
	}
});

const customerData = [
	{
		email: 'ishan199@gmail.com',
		password: 'ishan00',
		firstName: 'Ishan',
		lastName: 'Ahuja',
	},
	{
		email: 'krisha.khatri18@gmail.com',
		password: 'krishakhatri0018',
		firstName: 'Krisha',
		lastName: 'Khatri',
	},
];

async function queryStation() {
	let data = await station.find({
		location: {
			$geoWithin: {
				$centerSphere: [[20.4520708, 34.68467], 200 / 3963.2],
			},
		},
	});

	console.log(data.length);
}

let cities = [
	'Ludhiana',
	'Amristar',
	'Patiala',
	'Bathinda',
	'Chandigarh',
	'Mohali',
];

function getRandomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

async function createMockData() {
	let salt = bcrypt.genSaltSync(10);
	let first = 0;
	let last = 20;

	for (let i = 0; i < cities.length; i++) {
		for (let j = 0; j < 20; j++) {
			let firstName = faker.name.firstName();
			let lastName = faker.name.lastName();
			let email = `${firstName}.${lastName}@gmail.com`;

			let password = bcrypt.hashSync('samplePassword', salt);

			let userObj = new user({
				email: email,
				password: password,
				accountType: 'dealer',
				firstName: firstName,
				lastName: lastName,
			});

			let newUser = await userObj.save();

			let stationObj = new station({
				address: faker.address.streetAddress(),
				location: {
					type: 'Point',
					coordinates: [
						getRandomNumber(first, last),
						getRandomNumber(first, last),
					],
				},
				state: 'Punjab',
				city: cities[i],
				userId: newUser._id,
			});

			await stationObj.save();
		}
		first = last;
		last = last + 20;
	}

	for (let i = 0; i < customerData.length; i++) {
		let data = customerData[i];
		let password = bcrypt.hashSync(data['password'], salt);
		let userObj = new user({
			email: data.email,
			password: password,
			accountType: 'customer',
			firstName: data.firstName,
			lastName: data.lastName,
		});

		await userObj.save();
	}

	console.log('created data successfully');
}

createMockData();

// queryStation();
