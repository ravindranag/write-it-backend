import { Router } from "express";
import userRouter from "./user.js";
import blogRouter from "./blog.js";

const appRoutes = Router()

appRoutes.use('/user', userRouter)
appRoutes.use('/blog', blogRouter)

export default appRoutes