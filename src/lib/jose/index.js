import prisma from "../prisma/client.js"
import bcrypt from 'bcrypt'
import * as jose from 'jose'
import 'dotenv/config'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)
const alg = 'HS256'

const generateToken = async (payload) => {
	const jwt = await new jose.SignJWT(payload)
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setAudience('writeit:audience')
		.setExpirationTime('30d')
		.sign(secret)

	return jwt
}

export const authenticateUser = async (req, res, next) => {
	const { email, password } = req.body

	// console.log(email, password)

	try {
		if(!email) throw Error('Email required')
		if(!password) throw Error('Password required')
		const requestedUser = await prisma.user.findUniqueOrThrow({
			where: {
				email: email.toLowerCase()
			}
		})

		// console.log(requestedUser)

		const passwordMatch = await bcrypt.compare(password, requestedUser.password)
		// console.log(passwordMatch)

		if(passwordMatch) {
			const jwt = await generateToken({
				id: requestedUser.id,
				email: requestedUser.email
			})
			// console.log(jwt)

			const token = await prisma.token.upsert({
				create: {
					token: jwt,
					userId: requestedUser.id
				},
				update: {
					token: jwt
				},
				where: {
					userId: requestedUser.id
				}
			})

			req.token = jwt
			next()

		}

		else {
			throw Error('Invalid password')
		}

	}
	catch(err) {
		res.status(400).json({
			error: 'Authentication failed',
			message: err.message
		})
	}
}

export const verifyUser = async (req, res, next) => {
	// const [bearer, token] = req.headers['authorization'].split(' ')
	const auth = req.headers['authorization']
	if(!auth) {
		res.status(401).json({
			error: 'Authentication failed',
			message: 'Invalid token'
		})
		return
	}

	const token = auth.split(' ')

	if(token[0] !== process.env.BEARER) {
		res.status(401).json({
			error: 'Authentication failed',
			message: 'Invalid token'
		})
		return 
	}

	try {
		const { payload, protectedHeader } = await jose.jwtVerify(token[1], secret)

		// console.log(payload)

		const requestingUser = await prisma.user.findFirstOrThrow({
			where: {
				id: payload.id
			},
			select: {
				id: true,
				email: true,
				profile: {
					select: {
						id: true,
						name: true,
						username: true,
						bio: true,
						avatar: true
					}
				}
			}
		})

		req.user = requestingUser
		req.profile = requestingUser.profile
		next()

	}

	catch(err) {
		res.status(401).json({
			error: 'Authentication failed',
			message: err.message
		})
	}

}
