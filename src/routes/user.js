import { Router } from "express"
import { createUserController, generateOTPController, getUserInfoController, loginUserController, uploadProfilePicController, verifyOTPController } from "../controller/user.js"
import { authorizeAndGetProfile, authorizeUser } from "../helpers/auth-helper.js"
import { upload } from "../lib/multer/init.js"

const userRouter = Router()

userRouter.post('/signup', createUserController)
userRouter.post('/login', loginUserController)
userRouter.post('/otp/generate', generateOTPController) // get the OTP
userRouter.post('/otp/verify', verifyOTPController) // verify the OTP
userRouter.get('/', authorizeUser, getUserInfoController)
userRouter.put('/avatar', authorizeAndGetProfile, upload.single('avatar'), uploadProfilePicController)

export default userRouter