import { Router } from "express";
import { userRouter } from "./user.js";
import { blogRouter } from "./blog.js";
import { profileRouter } from "./profile.js";
import { CDNRouter } from "./cdn.js";
import otpRouter from "./otp.js";

const router = Router()

router.use('/user', userRouter)
router.use('/profile', profileRouter)
router.use('/blog', blogRouter)
router.use('/cdn', CDNRouter)
router.use('/otp', otpRouter)

export default router