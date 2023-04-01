import { createKeyword, getAllKeywords } from "../repository/keyword.js"

export const createKeywordController = async (req, res, next) => {
	try {
		const { name, description } = req.body
		if(!await createKeyword(name.toLowerCase(), description)) {
			return res.badRequest()
		}
		return res.sendStatus(201)
	}
	catch(err) {
		next(err)
	}
}

export const getAllKeywordsController = async (req, res, next) => {
	try {
		const allKeywords = await getAllKeywords()
		if(!allKeywords) {
			return res.sendStatus(404)
		}
		return res.ok(allKeywords)
	}
	catch(err) {
		next(err)
	}
}