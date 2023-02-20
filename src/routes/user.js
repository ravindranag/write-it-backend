import { Router } from "express";
import { userInfo, userLogIn, userLogOut, userSignUp } from "../controllers/user.js";
import { hashPassword } from "../lib/bcrypt/index.js";
import { authenticateUser, verifyAndLogOut, verifyUser } from "../lib/jose/index.js";

const router = Router()

router.post('/signup', hashPassword, userSignUp, authenticateUser, userLogIn)
router.post('/login', authenticateUser, userLogIn)
router.get('/verify', verifyUser, userInfo)
router.get('/logout', verifyAndLogOut, userLogOut)

export {router as userRouter}