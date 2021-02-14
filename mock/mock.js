const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { petrolPump, user } = require('../schemas');

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

const petrolPumpData = [
	{
		state: 'Punjab',
		city: 'Chandigarh',
		email: 'ramlal101@gmail.com',
		password: 'ramlal',
		address:
			'Village POLOMAJRA, NH 95, LHS, CHANDIGARH LUDHIANA ROAD, KAHMANO DISTRICT FATEHGARH SAHIB (PB) PIN - 140801',
		location: {
			type: 'Point',
			coordinates: [77.4520708, 28.68467],
		},
		firstName: 'Ram lal',
		lastName: 'Mal',
	},
	{
		state: 'Punjab',
		city: 'Chandigarh',
		address:
			'BASSI PATHANA, WML, FATEHGARH MORIND ROAD, DISTRICT FATEHGARH (PB). PIN - 140412',
		email: 'ramni.ranjan18@gmail.com',
		password: 'ramni7784',
		location: {
			type: 'Point',
			coordinates: [77.4520708, 20.68467],
		},
		firstName: 'Ramni',
		lastName: 'Ranjan',
	},
	{
		state: 'Punjab',
		city: 'Chandigarh',
		address:
			'VILL. MACHCHRAIKALAN, TEHSIL. AMLOH, DISTT. FATEHGARH SAHIB (PB). PIN - 147203',
		email: 'balwinderkaur@yahoo.com',
		password: 'balwinderkaur',
		location: {
			type: 'Point',
			coordinates: [77.4520708, 40.68467],
		},
		firstName: 'Balwinder',
		lastName: 'Kaur',
	},
	{
		state: 'Punjab',
		city: 'Chandigarh',
		address:
			'NH21, LHS, ROPAR-CHANDIGARH ROAD,KURALI DISTT. ROPAR (PB). PIN - 140103',
		location: {
			type: 'Point',
			coordinates: [-73.98185529999999, 40.7782266],
		},
		email: 'gschawla98@gmail.com',
		password: 'gschawla0019',
		firstName: 'G.S.',
		lastName: 'Chawla',
	},
	{
		state: 'Punjab',
		city: 'Chandigarh',
		address: 'PHASE 9, NEAR PCA STADIUM,SAS NAGAR,MOHALI,PUNJAB. PIN - 160059',
		location: {
			type: 'Point',
			coordinates: [50.0257144, 22.3320424],
		},
		email: 'tejindersingh12@gmail.com',
		password: 'tejinder1111',
		firstName: 'Tejinder',
		lastName: 'Singh',
	},
];

async function create_petrol_pump_data() {
	await petrol_pump.remove();
	for (let i = 0; i < petrolPumpData.length; i++) {
		let data = new petrol_pump(petrolPumpData[i]);
		await data.save();
	}
	console.log('data created successfully');
}

async function query_petrol_pump() {
	let data = await petrol_pump.find({
		location: {
			$geoWithin: {
				$centerSphere: [[76.4520708, 28.68467], 100 / 3963.2],
			},
		},
	});
}

async function createMockData() {
	let salt = bcrypt.genSaltSync(10);
	for (let i = 0; i < petrolPumpData.length; i++) {
		let data = petrolPumpData[i];
		let password = bcrypt.hashSync(data['password'], salt);
		let userObj = new user({
			email: data.email,
			password: password,
			accountType: 'dealer',
			firstName: data.firstName,
			lastName: data.lastName,
		});

		let newUser = await userObj.save();

		let petrolPumpObj = new petrolPump({
			address: data.address,
			dealer: data.dealer,
			location: data.location,
			state: data.state,
			city: data.city,
			userId: newUser._id,
		});
		await petrolPumpObj.save();
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
}
//create_petrolPumpData();

createMockData();
