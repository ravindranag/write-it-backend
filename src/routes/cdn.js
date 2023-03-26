import { Router } from "express";
import { getImageUrlController } from "../controller/cdn.js";

const CDNRouter = Router()

CDNRouter.get('/:folder/:file', getImageUrlController)

export default CDNRouter