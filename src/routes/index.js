import { Router } from "express";
import userRouter from "./user.js";

const appRoutes = Router()

appRoutes.use('/user', userRouter)

export default appRoutes