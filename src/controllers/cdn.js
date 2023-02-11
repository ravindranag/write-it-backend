import { getAvatarDownloadUrl } from "../lib/firebase/firebase.js"

export const getSignedUrl = async (req, res, next) => {
	const { folder, file } = req.params

	try {
		const url = await getAvatarDownloadUrl(`${folder}/${file}`)
		if(url) {
			res.redirect(url)
		} else {
			throw new Error('failed loading image')
		}
	}

	catch(err) {
		next(err)
	}
}