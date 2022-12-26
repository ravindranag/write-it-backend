import { Router } from "express";
import { verifyUser } from "../lib/jose/index.js";
import { blogCreate } from "../controllers/blog.js";

const router = Router()

router.post('/create', verifyUser, blogCreate)

export { router as blogRouter }