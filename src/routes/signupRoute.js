import express from "express";
import Client from "../controllers/signupController.js";

const router= express.Router();

router.post("/",Client.signup);
router.get("/",Client.AllUsers)

export default router

