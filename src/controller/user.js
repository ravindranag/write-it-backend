import { comparePasswords, hashPassword } from "../lib/bcrypt/password.js"
import { uploadProfilePic } from "../lib/firebase/utils.js"
import { generateJWT } from "../lib/jose/jwt.js"
import { generateOTP, verifyOTP } from "../lib/otplib/otp.js"
import { createUser, getListOfMembers, getMemberProfileByUsername, getUserByEmail, getUserById, updateProfileById, userExists, userExistsByUsername } from "../repository/user.js"
import { readFileSync, unlink } from 'fs'

export const createUserController = async (req, res, next) => {
	try {
		let data = req.body
		if(await userExists(data.email)) {
			return res.badRequest('User with email already exists.')
		}
		if(await userExistsByUsername(data.profile.username)) {
			return res.badRequest('User with username already exists.')
		}
		let hashedPassword = await hashPassword(data.password) 
		data.password = hashedPassword
		if(!await createUser(data)) {
			return res.sendStatus(500)
		}
		return res.sendStatus(201)
	}
	catch(err) {
		res.sendStatus(500)
	}
}

export const loginUserController = async (req, res, next) => {
	try {
		let { email, password } = req.body
		if(!await userExists(email)) {
			return res.badRequest('No user found.')
		}
		let user = await getUserByEmail(email)
		if(!await comparePasswords(password, user.password)) {
			return res.badRequest('Invalid password')
		}
		let token = await generateJWT({
			userId: user.id,
			profileId: user.profile.id,
		})
		return res.ok({
			access_token: token
		})
	}
	catch(err) {
		return res.sendStatus(500)
	}
}

export const getUserInfoController = async (req, res, next) => {
	const { userId } = req.locals
	try {
		let user = await getUserById(userId)
		if(!user) {
			return res.sendStatus(404)
		}
		return res.ok(user)
	}
	catch(err) {
		return res.sendStatus(500)
	}
}

export const getAllMembersController = async (req, res, next) => {
	try {
		const allMembers = await getListOfMembers()
		if(!allMembers) return res.sendStatus(404)
		return res.ok(allMembers)
	}
	catch(err) {
		return res.sendStatus(500)
	}
}

export const updateProfileController = async (req, res, next) => {
	try {
		let data = req.body
		let { userId } = req.locals
		const updatedProfile = await updateProfileById(userId, data)
		if(!updatedProfile) return res.sendStatusResponse(500, 'Could not update profile.')
		return res.ok(updatedProfile)
	}
	catch(err) {
		return res.sendStatus(500)
	}
}

export const getMemberProfileController = async (req, res, next) => {
	try {
		const { username } = req.params
		const memberProfile = await getMemberProfileByUsername(username)
		if(!memberProfile) {
			return res.sendStatus(404)
		}
		return res.ok(memberProfile)
	}
	catch(err) {
		return res.sendStatus(500)
	}
}

export const uploadProfilePicController = async (req, res, next) => {
	try {
		const { file } = req
		const { profileId } = req.locals
		const fb = readFileSync(file.path)
		const image = await uploadProfilePic(file.filename, fb)
		unlink(file.path, (err) => {
			if(err) {
				console.error('failed to delete')
			}
			console.log('file deleted')
		})
		if(image.uploaded) {
			const updatedProfile = await updateProfileById(profileId, {
				avatar: image.key
			})
			if(!updatedProfile) throw Error('Cannot update profile')
			return res.ok(updatedProfile)
		} else {
			return res.sendStatus(400)
		}
	}
	catch(err) {
		console.log(err)
		return res.sendStatusResponse(500, err.message)
	}
}
export const generateOTPController = async (req, res, next) => {
	const { email } = req.body;
	try {
		const otp = generateOTP(email);
	
		return res.ok(`OTP sent to ${email}`)
	} catch(err) {
		next(Error('Server error'))
	}
}

export const verifyOTPController = async (req, res, next) => {
	const { otp, email } = req.body

	const verified = verifyOTP(otp, email)
	if(verified) {
		return res.ok('Email verified')
	} else {
		return res.badRequest('Invalid OTP')
	}
}