import { Router } from "express"
import { createUserController, generateOTPController, getUserInfoController, loginUserController, verifyOTPController } from "../controller/user.js"
import { authorizeUser } from "../helpers/auth-helper.js"

const userRouter = Router()

userRouter.post('/signup', createUserController)
userRouter.post('/login', loginUserController)
userRouter.post('/otp/generate', generateOTPController) // get the OTP
userRouter.post('/otp/verify', verifyOTPController) // verify the OTP
userRouter.get('/', authorizeUser, getUserInfoController)


export default userRouter