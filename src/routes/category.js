import { Router } from "express";
import { authorizeUser } from "../helpers/auth-helper.js";
import { createCategoryController, getAllCategoriesController } from "../controller/category.js";

const categoryRouter = Router()

categoryRouter.post('/', authorizeUser, createCategoryController)
categoryRouter.get('/', getAllCategoriesController)

export default categoryRouter