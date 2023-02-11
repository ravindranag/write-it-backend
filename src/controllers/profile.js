import prisma from "../lib/prisma/client.js"
import { readFileSync } from 'fs'
import { uploadAvatarImage } from "../lib/firebase/firebase.js"

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
		const image = await uploadAvatarImage(fb, file.filename)

		const updatedProfile = await prisma.profile.update({
			where: {
				id: profile.id
			},
			data: {
				avatar: image.key
			}
		})

		res.json({
			message: 'Profile updated',
			updatedProfile
		})
	}
	catch(err) {
		next(err)
	}
}