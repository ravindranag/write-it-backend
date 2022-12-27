import prisma from "../lib/prisma/client.js"

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