import { Router } from "express";
import { verifyUser } from "../lib/jose/index.js";
import { blogCreate, blogGetBySlug } from "../controllers/blog.js";

const router = Router()

router.post('/create', verifyUser, blogCreate)
router.get('/:slug', blogGetBySlug)

export { router as blogRouter }