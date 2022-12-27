import { Router } from "express";
import { userLogIn, userSignUp } from "../controllers/user.js";
import { hashPassword } from "../lib/bcrypt/index.js";
import { authenticateUser } from "../lib/jose/index.js";

const router = Router()

router.post('/signup', hashPassword, userSignUp, authenticateUser, userLogIn)
router.post('/login', authenticateUser, userLogIn)

export {router as userRouter}