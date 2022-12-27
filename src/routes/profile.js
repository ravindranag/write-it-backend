import { Router } from "express";
import { verifyUser } from "../lib/jose/index.js";
import { profileCreate } from "../controllers/profile.js";

const router = Router()

router.post('/', verifyUser, profileCreate)

export { router as profileRouter }