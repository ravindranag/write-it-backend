import bcrypt from 'bcrypt'

const saltRounds = 10

export const hashPassword = async (req, res, next) => {
	const { password } = req.body

	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds)
		req.body.hashedPassword = hashedPassword

		next()
	}

	catch(err) {
		res.status(500).json({
			error: 'Request failed',
			message: 'Server error. Try again after sometime'
		})
	}

}