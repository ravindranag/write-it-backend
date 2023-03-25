import { Router } from "express";
import { authorizeUser } from "../helpers/auth-helper.js";
import { createBlogController, getBlogBySlugController } from "../controller/blog.js";

const blogRouter = Router()

blogRouter.post('/', authorizeUser, createBlogController)
blogRouter.get('/:slug', getBlogBySlugController)

export default blogRouter