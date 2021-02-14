const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let pathName = `${path.dirname(require.main.filename)}/uploads/`;
		cb(null, pathName);
	},
	filename: function (req, file, cb) {
		let buf = crypto.randomBytes(16);
		let filename = buf.toString('hex') + path.extname(file.originalname);
		cb(null, filename);
	},
});

const upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		let { mimetype } = file;
		if (
			mimetype !== 'image/png' &&
			mimetype !== 'image/jpeg' &&
			mimetype !== 'image/jpg'
		) {
			return cb(new Error('Invalid file type'));
		}
		return cb(null, true);
	},
	limits: { fileSize: 3000000 },
});
module.exports = { upload: upload };
