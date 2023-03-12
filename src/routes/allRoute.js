import express from "express";
import blogRoute from "./blogRoute.js";
import signupRoute from "./signupRoute.js";
import loginRoute from "./loginRoute.js"
import queryRoute from "./queryRoute.js"

const  router = express.Router()
//all routes
router.use("/blogs", blogRoute)
router.use("/signup",signupRoute)
router.use("/login", loginRoute )
router.use("/query",queryRoute)
export default router