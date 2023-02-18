import multer, { diskStorage } from 'multer'

const storage = diskStorage({
	destination: 'uploads',
	filename: function(req, file, cb) {
		const { profile } = req
		const fn = profile.username + '.' + file.originalname.split('.').slice(-1)[0]
		cb(null, fn)
	}
})

export const upload = multer({
	storage: storage,
	limits: {
		fileSize: 524288
	}
})