import { generateOTP, verifyOTP } from "../lib/otplib/otp.js";

export const generateOTPController = async (req, res, next) => {
	const { email } = req.body;
	try {
		const otp = generateOTP(email);
	
		res.json({
			message: `OTP sent to ${email}`
		})
	} catch(err) {
		next(Error('Server error'))
	}
}

export const verifyOTPController = async (req, res, next) => {
	const { otp, email } = req.body

	const verified = verifyOTP(otp, email)
	if(verified) {
		res.status(200).json({
			message: 'Email verified'
		})
	} else {
		res.status(400).json({
			message: 'Verification failed. Retry'
		})
	}

}