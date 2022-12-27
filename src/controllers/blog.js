import prisma from "../lib/prisma/client.js"

export const blogCreate = async (req, res, next) => {
	const { profile } = req
	const { title, slug, content, description } = req.body

	if(!profile) next(new Error('Authentication failed'))

	if(!title || !slug || !content) {
		next(new Error('required fields are empty'))
	}

	try {
		const newBlog = await prisma.blog.create({
			data: {
				title: title,
				slug: slug,
				content: content,
				description: description,
				author: {
					connect: {
						id: profile.id
					}
				}
			}
		})

		res.json({
			message: 'Blog created successfully',
			blog: newBlog
		})

	}

	catch(err) {
		next(err)
	}
}

export const blogGetBySlug = async (req, res, next) => {
	const { slug } = req.params

	try {
		const blog = await prisma.blog.findFirstOrThrow({
			where: {
				slug: slug
			},
			include: {
				author: {
					select: {
						name: true,
						username: true,
						avatar: true,
						bio: true
					}
				}
			}
		})

		res.json({
			message: 'Blog fetched',
			blog: blog
		})
	}

	catch(err) {
		next(err)
	}

}
