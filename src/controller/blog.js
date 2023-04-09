import { blogLiked, createBlog, dislikeBlog, getBlogBySlug, getLatestBlogs, likeBlog, slugExists, updateBlogById, userLikesBlog } from "../repository/blog.js"
import { addKeyWordsToBlog, deleteKeywordFromBlog } from "../repository/keyword.js"

export const createBlogController = async (req, res, next) => {
	try {
		const data = req.body
		const { profileId } = req.locals
		const blogData = data, keywords = data.keywords
		blogData.keywords = undefined
		blogData['authorId'] = profileId
		if(await slugExists(data.slug)) {
			return res.badRequest('Slug already exists')
		}
		const blog = await createBlog(blogData)
		if(!blog) {
			return res.badRequest()
		}
		if(!await addKeyWordsToBlog(blog.id, keywords)) {
			return res.ok('Could not set keywords')
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
			if(!await likeBlog(slug, profileId)) throw Error('failed')
		}
		else if(!await dislikeBlog(slug, profileId)) {
			throw Error('failed')
		}
		return res.sendStatus(200)
	}
	catch(err) {
		return res.sendStatus(500)
	}
}

export const getLatestBlogsController = async (req, res, next) => {
	try {
		const latestBlogs = await getLatestBlogs()
		if(!latestBlogs) {
			return res.sendStatus(500)
		}
		return res.ok(latestBlogs)
	}
	catch(err) {
		return res.sendStatus(500)
	}
}

export const slugAvailabilityController = async (req, res, next) => {
	try {
		const { slug } = req.params
		if(await slugExists(slug)) {
			return res.sendStatus(400)
		}
		return res.sendStatus(200)
	}
	catch(err) {
		next(err)
	}
}

export const updateKeywordController = async (req, res, next) => {
	try {
		const { slug } = req.params
		const { keywords } = req.body
		const { blogId } = req.locals
		const update = await addKeyWordsToBlog(blogId, keywords)
		return res.sendStatus(200)

	} catch(err) {
		return res.sendStatus(400)
	}
}

export const deleteKeywordController = async (req, res, next) => {
	try {
		const { keywordId } = req.params
		const { blogId } = req.locals
		if(!await deleteKeywordFromBlog(blogId, keywordId)) {
			return res.sendStatus(400)
		}
		return res.ok('Deleted')
	} catch(err) {
		return res.sendStatus(400)
	}
}

export const updateBlogController = async (req, res, next) => {
	try {
		const { blogId } = req.locals
		const data = req.body
		const updatedBlog = await updateBlogById(blogId, data)
		if(!updatedBlog) throw Error('Bad request')
		return res.ok(updatedBlog)
	} catch(err) {
		return res.sendStatus(400)
	}
}

export const blogLikedController = async (req, res, next) => {
	try {
		const { slug } = req.params
		const { profileId } = req.locals
		if(!await blogLiked(slug, profileId)) {
			return res.sendStatus(400)
		}
		return res.sendStatus(200)
	} catch(err) {
		return res.sendStatus(500)
	}
}