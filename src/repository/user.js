import prisma from "../lib/prisma/init.js"

export const createUser = async (data) => {
	try {
		await prisma.user.create({
			data: {
				email: data.email,
				password: data.password,
				profile: {
					create: {
						name: data.profile.name,
						username: data.profile.username,
						bio: data.profile.bio,
						twitter_username: data.profile.twitter_username
					}
				}
			}
		})
		return true
	}
	catch(err) {
		return false
	}
}

export const userExists = async (email) => {
	try {
		let count = await prisma.user.count({
			where: {
				email: email
			}
		})
		// console.log('count', count)
		if(count > 0) return true
		else return false
	}
	catch(err) {
		throw err
	}
}

export const userExistsByUsername = async (username) => {
	try {
		let count = await prisma.profile.count({
			where: {
				username: username
			}
		})
		// console.log('count', count)
		if(count > 0) return true
		else return false
	}
	catch(err) {
		throw err
	}
}


export const getUserByEmail = async (email) => {
	try {
		let user = await prisma.user.findFirstOrThrow({
			where: {
				email: email
			},
			include: {
				profile: true
			}
		})
		return user
	}
	catch(err) {
		throw err
	}
}

export const getUserById = async (id) => {
	try {
		let user = await prisma.user.findFirstOrThrow({
			where: {
				id: id
			},
			select: {
				email: true,
				profile: {
					select: {
						name: true,
						username: true,
						avatar: true,
						bio: true,
						twitter_username: true
					}
				}
			}
		})
		return user
	}
	catch(err) {
		return null
	}
}

export const getListOfMembers = async () => {
	try {
		const allMembers = await prisma.user.findMany({
			select: {
				id: true,
				email: true,
				profile: {
					select: {
						avatar: true,
						name: true,
						username: true,
						bio: true,
						twitter_username: true
					}
				}
			}
		})
		return allMembers
	}
	catch(err) {
		return null
	}
}

export const updateProfileById = async (profileId, data) => {
	try {
		let updatedProfile = await prisma.profile.update({
			where: {
				id: profileId
			},
			data: data,
			select: {
				name: true,
				username: true,
				avatar: true,
				twitter_username: true
			}
		})
		return updatedProfile
	}
	catch(err) {
		console.error(err)
		return null
	}
}

export const getProfileById = async (profileId) => {
	try {
		const profile = await prisma.profile.findFirstOrThrow({
			where: {
				id: profileId
			}
		})
		return profile
	}
	catch(err) {
		return null
	}
}

export const getMemberProfileByUsername = async (username) => {
	try {
		const memberProfile = await prisma.profile.findFirstOrThrow({
			where: {
				username: username
			},
			select: {
				id: true,
				name: true,
				username: true,
				avatar: true,
				bio: true,
				twitter_username: true
			}
		})
		return memberProfile
	}
	catch(err) {
		return null
	}
}