import { Router } from "express";
import userRouter from "./user.js";
import blogRouter from "./blog.js";
import CDNRouter from "./cdn.js";
import categoryRouter from "./category.js";
import keywordRouter from "./keyword.js";

const appRoutes = Router()

appRoutes.use('/user', userRouter)
appRoutes.use('/blog', blogRouter)
appRoutes.use('/cdn', CDNRouter)
appRoutes.use('/category', categoryRouter)
appRoutes.use('/keyword', keywordRouter)

export default appRoutes