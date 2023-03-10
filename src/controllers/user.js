import prisma from "../lib/prisma/client.js"

export const userSignUp = async (req, res, next) => {
	const { email, hashedPassword } = req.body

	if(!email || !hashedPassword) {
		next(new Error('Required fields are empty'))
	}

	try {
		const newUser = await prisma.user.create({
			data: {
				email: email.toLowerCase(),
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

	// console.log(token)

	if(token) {
		res.json({
			message: 'User logged in',
			accessToken: token
		})
	}

}

export const userInfo = async (req, res, next) => {
	const { user } = req

	res.json({
		currentUser: user
	})
}

export const userLogOut = async (req, res, next) => {
	res.json({
		message: 'User logged out'
	})
}