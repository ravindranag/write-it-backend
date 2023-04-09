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


/**
 * 
 * @param {string} blogId 
 * @param {string[]} keywordList 
 * @returns 
 */
export const addKeyWordsToBlog = async (blogId, keywordList) => {
	try {
		const update = await prisma.blogKeyword.createMany({
			data: keywordList.map(keyword => ({
				blogId: blogId,
				keywordId: keyword.id
			})),
			skipDuplicates: true
		})
		return true
	} catch(err) {
		return null
	}
}

export const deleteKeywordFromBlog = async (blogId, keywordId) => {
	try {
		await prisma.blogKeyword.delete({
			where: {
				blogId_keywordId: {
					blogId: blogId,
					keywordId: keywordId
				}
			}
		})
		return true
	} catch(err) {
		return false
	}
}