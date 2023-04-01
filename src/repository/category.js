import prisma from "../lib/prisma/init.js"

export const createCategory = async (name, description) => {
	try {
		await prisma.category.create({
			data: {
				name: name,
				description: description
			}
		})
		return true
	}
	catch(err) {
		return false
	}
}

export const getAllCategories = async () => {
	try {
		const allCategories = await prisma.category.findMany()
		return allCategories
	}
	catch(err) {
		return null
	}
}