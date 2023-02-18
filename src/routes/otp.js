import { Router } from "express";
import { generateOTPController, verifyOTPController } from "../controllers/otp.js";

const otpRouter = Router()

otpRouter.post('/generate', generateOTPController)

otpRouter.post('/verify', verifyOTPController)

// otpRouter.get('/options', (req, res, next) => {
// 	const result = getAllOptions()
// 	res.json({
// 		options: result
// 	})
// })

export default otpRouter