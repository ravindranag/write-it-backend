import { getImageUrl } from "../lib/firebase/utils.js"

export const getImageUrlController = async (req, res, next) => {
	try {
		const { folder, file } = req.params
		const key = `${folder}/${file}`
		const url = await getImageUrl(key)
		if(!url) {
			return res.notFound()
		}
		res.redirect(url)
	}
	catch(err) {
		next(err)
	}
}