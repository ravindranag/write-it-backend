import { createBlog, getBlogBySlug, slugExists, userLikesBlog } from "../repository/blog.js"

export const createBlogController = async (req, res, next) => {
	try {
		const data = req.body
		const { profileId } = req.locals
		data['authorId'] = profileId
		if(await slugExists(data.slug)) {
			return res.badRequest('Slug already exists')
		}
		if(!await createBlog(data)) {
			return res.sendStatus(400)
		}
		return res.sendStatus(201)
	}
	catch(err) {
		return res.sendStatus(500)
	}
}

export const getBlogBySlugController = async (req, res, next) => {
	try {
		const { slug } = req.params
		const blog = await getBlogBySlug(slug)
		if(!blog) {
			return res.sendStatus(404)
		}
		return res.ok(blog)
	}
	catch(err) {
		return res.sendStatus(500)
	}
}

export const userLikesBlogController = async (req, res, next) => {
	try {
		const { profileId } = req.locals
		const { slug } = req.params
		if(!await userLikesBlog(profileId, slug)) {
			return res.sendStatus(409)
		}
		return res.sendStatus(200)
	}
	catch(err) {
		return res.sendStatus(500)
	}
}