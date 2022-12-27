import prisma from "../lib/prisma/client.js"
import supabase from "../lib/supabase/client.js"
import { readFileSync } from 'fs'

export const profileCreate = async (req, res, next) => {
	const { name, username, avatar, bio } = req.body
	const { user } = req
	try {
		const newProfile = await prisma.profile.create({
			data: {
				name: name,
				username: username,
				bio: bio,
				avatar: avatar,
				user: {
					connect: {
						id: user.id
					}
				}
			}
		})

		res.json({
			message: 'Profile created',
			profile: newProfile
		})

	}
	catch(err) {
		next(err)
	}

}

export const avatarUpdate = async (req, res, next) => {
	const { file, profile } = req
	console.log(file)

	const fb = readFileSync(file.path)

	try {
		const { data, error } = await supabase
			.storage
			.from('writeit')
			.upload(file.key, fb, {
				upsert: true,
				contentType: file.mimetype,
			})

		if(error) {
			// console.log(error)
			throw error
		}
		else {
			const updatedProfile = await prisma.profile.update({
				data: {
					avatar: data.path
				},
				where: {
					id: profile.id
				}
			})

			res.json({
				message: 'file uploaded successfully',
				updatedProfile
			})
		}
	}
	catch(err) {
		next(err)
	}
}