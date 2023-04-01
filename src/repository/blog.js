import prisma from "../lib/prisma/init.js"

export const slugExists = async (slug) => {
	try {
		let count = await prisma.blog.count({
			where: {
				slug: slug
			}
		})
		return count > 0 ? true : false
	}
	catch(err) {
		return false
	}
}

export const createBlog = async (data) => {
	try {
		await prisma.blog.create({
			data: data
		})
		return true
	}
	catch(err) {
		return false
	}
}

export const getBlogBySlug = async (slug) => {
	try {
		const blog = await prisma.blog.findFirstOrThrow({
			where: {
				slug: slug
			},
			select: {
				title: true,
				slug: true,
				description: true,
				data: true,
				createdAt: true,
				updatedAt: true,
				author: {
					select: {
						name: true,
						username: true,
						avatar: true,
						bio: true,
						twitter_username: true
					}
				},
				likedBy: {
					select: {
						userProfile: {
							select: {
								username: true,
								avatar: true,
							}
						},
					},
				}
			}
		})
		return blog
	}
	catch(err) {
		console.log(err)
		return null
	}
}

export const userLikesBlog = async (profileId, slug) => {
	try {
		await prisma.blogLikes.create({
			data: {
				blogSlug: slug,
				profileId: profileId
			}
		})
		return true
	}
	catch(err) {
		return false
	}
}

export const getLatestBlogs = async () => {
	try {
		const latestBlogs = await prisma.blog.findMany({
			orderBy: {
				updatedAt: 'desc'
			},
			select: {
				title: true,
				slug: true,
				description: true,
				data: true,
				createdAt: true,
				updatedAt: true,
				author: {
					select: {
						name: true,
						username: true,
						avatar: true,
						bio: true,
						twitter_username: true,
					}
				},
				_count: {
					select: {
						likedBy: true
					}
				}

			}
		})
		return latestBlogs
	}
	catch(err) {
		return null
	}
}