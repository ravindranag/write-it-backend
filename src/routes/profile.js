import { Router } from "express";
import { verifyUser } from "../lib/jose/index.js";
import { avatarUpdate, profileCreate } from "../controllers/profile.js";
import { upload } from "../lib/multer/index.js";

const router = Router()

router.post('/', verifyUser, profileCreate)
router.post('/avatar', verifyUser, upload.single('avatar'), avatarUpdate)

export { router as profileRouter }
