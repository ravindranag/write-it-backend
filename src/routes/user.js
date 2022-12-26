import { Router } from "express";
import { userSignUp } from "../controllers/user.js";
import { hashPassword } from "../lib/bcrypt/index.js";

const router = Router()

router.post('/signup', hashPassword, userSignUp)

export {router as userRouter}