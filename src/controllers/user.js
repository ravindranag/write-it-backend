import prisma from "../lib/prisma/client.js"

export const userSignUp = async (req, res, next) => {
	const { email, password, username } = req.body

	if(!email || !username || !password) {
		next(new Error('Required fields are empty'))
	}

	try {
		const newUser = await prisma.user.create({
			data: {
				email: email,
				password: password,
				username: username
			},
			select: {
				id: true,
				username: true
			}
		})

		res.json({
			message: 'Sign up successful',
			user: newUser
		})

	}

	catch(err) {
		next(err)
	}

}

export const userLogIn = async (req, res, next) => {
	const { token } = req

	if(token) {
		res.json({
			message: 'User logged in',
			access_token: token
		})
	}

}