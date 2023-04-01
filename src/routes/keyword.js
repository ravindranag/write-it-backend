import { Router } from "express";
import { authorizeUser } from "../helpers/auth-helper.js";
import { createKeywordController, getAllKeywordsController } from "../controller/keyword.js";

const keywordRouter = Router()

keywordRouter.post('/', authorizeUser, createKeywordController)
keywordRouter.get('/', getAllKeywordsController)

export default keywordRouter