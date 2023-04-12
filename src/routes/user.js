import { Router } from "express"
import { createUserController, getUserInfoController, loginUserController, uploadProfilePicController } from "../controller/user.js"
import { authorizeAndGetProfile, authorizeUser } from "../helpers/auth-helper.js"
import { upload } from "../lib/multer/init.js"

const userRouter = Router()

userRouter.post('/signup', createUserController)
userRouter.post('/login', loginUserController)
userRouter.get('/', authorizeUser, getUserInfoController)
userRouter.put('/avatar', authorizeAndGetProfile, upload.single('avatar'), uploadProfilePicController)

export default userRouter