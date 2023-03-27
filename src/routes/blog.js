import { Router } from "express";
import { authorizeUser } from "../helpers/auth-helper.js";
import { createBlogController, getBlogBySlugController, getLatestBlogsController, slugAvailabilityController, userLikesBlogController } from "../controller/blog.js";

const blogRouter = Router()

blogRouter.post('/', authorizeUser, createBlogController)
blogRouter.get('/:slug', getBlogBySlugController)
blogRouter.put('/:slug/like', authorizeUser, userLikesBlogController)
blogRouter.get('/', getLatestBlogsController)
blogRouter.get('/slug/:slug', authorizeUser, slugAvailabilityController)

export default blogRouter