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
			include: {
				author: true
			}
		})
		return blog
	}
	catch(err) {
		return null
	}
}