import { Router } from "express";
import { getSignedUrl } from "../controllers/cdn.js";

const router = Router()

router.use('/:folder/:file', getSignedUrl)

export {
	router as CDNRouter
}