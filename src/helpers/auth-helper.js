import { verifyJWT } from "../lib/jose/jwt.js"
import { getFullBlogBySlug } from "../repository/blog.js"
import { getProfileById } from "../repository/user.js"

export const authorizeUser = async (req, res, next) => {
	try {
		let token = req.headers.authorization
		let payload = await verifyJWT(token)
		if(!payload) throw Error('Forbidden')
		req.locals = {
			userId: payload.userId,
			profileId: payload.profileId,
		}
		next()
	}
	catch(err) {
		return res.sendStatus(403)
	}
}

export const authorizeAdmin = async (req, res, next) => {
	try {
		let token = req.headers.authorization
		let payload = await verifyJWT(token)
		// console.log(payload)
		if(payload.role != 'Admin') throw Error('Not an admin')
		req.locals = {
			userId: payload.userId,
			profileId: payload.profileId,
		}
		next()
	}
	catch(err) {
		// console.log(err)
		return res.sendStatusResponse(403, 'You need to be an admin to perform this action.')
	}
}

export const authorizeAndGetProfile = async (req, res, next) => {
	try {
		let token = req.headers.authorization
		let payload = await verifyJWT(token)
		// console.log(payload)
		const profile = await getProfileById(payload.profileId)
		req.locals = {
			userId: payload.userId,
			profileId: payload.profileId,
			profile: profile
		}
		next()
	}
	catch(err) {
		// console.log(err)
		return res.sendStatusResponse(403, err.message)
	}
}

export const authorizeAuthor = async (req, res, next) => {
	try {
		let token = req.headers.authorization
		console.log(token)
		let payload = await verifyJWT(token)

		const { slug } = req.params
		const blog = await getFullBlogBySlug(slug)
		if(!blog || blog.authorId !== payload.profileId) {
			throw Error('Forbidden')
		}
		req.locals = {
			userId: payload.userId,
			profileId: payload.profileId,
			blogId: blog.id
		}
		next()
	} catch(err) {
		return res.sendStatus(403)
	}
}