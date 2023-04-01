import { createCategory, getAllCategories } from "../repository/category.js"

export const createCategoryController = async (req, res, next) => {
	try {
		const { name, description } = req.body
		if(!description) {
			return res.badRequest('Description is required')
		}
		if(!await createCategory(name.toLowerCase(), description)) {
			return res.badRequest()
		}
		return res.sendStatus(201)
	}
	catch(err) {
		next(err)
	}
}

export const getAllCategoriesController = async (req, res, next) => {
	try {
		const allCategories = await getAllCategories()
		if(!allCategories) {
			return res.sendStatus(404)
		}
		return res.ok(allCategories)
	}
	catch(err) {
		next(err)
	}
}