import { Router } from "express";
import userRouter from "./user.js";
import blogRouter from "./blog.js";
import CDNRouter from "./cdn.js";

const appRoutes = Router()

appRoutes.use('/user', userRouter)
appRoutes.use('/blog', blogRouter)
appRoutes.use('/cdn', CDNRouter)

export default appRoutes