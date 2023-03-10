import { totp } from "otplib";
import { sendOTPToUser } from "../google/utils.js";

const secret = 'ravindranag52@gmail.com'

totp.options = {
	step: 60*5
}

export const generateOTP = (email) => {
	// console.log(secret)
	const otp = totp.generate(email)
	sendOTPToUser({
		email,
		otp
	})
	return otp
}

export const verifyOTP = (otp, email) => {
	const isValid2 = totp.verify({token: otp, secret: email})

	return isValid2
}

export const getAllOptions = () => {
	const options = totp.allOptions()
	return options
}