import prisma from "../lib/prisma/client.js"

export const userSignUp = async (req, res, next) => {
	const { email, hashedPassword } = req.body

	if(!email || !hashedPassword) {
		next(new Error('Required fields are empty'))
	}

	try {
		const newUser = await prisma.user.create({
			data: {
				email: email,
				password: hashedPassword
			}
		})

		next()

		// res.json({
		// 	message: 'Sign up successful',
		// 	user: newUser
		// })

	}

	catch(err) {
		next(err)
	}

}

export const userLogIn = async (req, res, next) => {
	const { token } = req

	console.log(token)

	if(token) {
		res.json({
			message: 'User logged in',
			access_token: token
		})
	}

}