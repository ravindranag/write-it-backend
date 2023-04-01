import prisma from "../lib/prisma/init.js"

/**
 * 
 * @param {string} name Name of the keyword
 * @param {string?} description Brief description of the keyword
 * @returns {Promise<boolean>} whether the operation was successful
 */
export const createKeyword = async (name, description = "") => {
	try {
		await prisma.keyword.create({
			data: {
				name: name,
				description: description
			}
		})
		return true
	}
	catch(err) {
		return  false
	}
}

export const getAllKeywords = async () => {
	try {
		const allKeywords  = await prisma.keyword.findMany()
		return allKeywords 
	}
	catch(err) {
		return null
	}
}
