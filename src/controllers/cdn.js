import axios from "axios"
import supabase from "../lib/supabase/client.js"

export const getSignedUrl = async (req, res, next) => {
	const { folder, file } = req.params

	try {
		const { data, error } = await supabase
			.storage
			.from('writeit')
			.createSignedUrl(`${folder}/${file}`, 3600, {
				// download: true

			})

		if(error) {
			throw error
		}
		else {
			res.set({
				'Content-Type': 'image/png'
			})
			res.redirect(data.signedUrl)
		}
	}

	catch(err) {
		next(err)
	}
}