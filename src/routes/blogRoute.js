import express from "express";
import blogController from "../controllers/blogController.js";
import verifyIsAdmin from "../middleware/verifyIsAdmin.js";

const router= express.Router();

 router.get("/", blogController.getBLogs);
router.get("/:id",blogController.getBlog)
router.post("/",  verifyIsAdmin,blogController.createBlog)
router.put("/:id", verifyIsAdmin,blogController.updateBlog)
router.delete("/:id",verifyIsAdmin, blogController.deleteBlog)
router.put("/:id/comment", blogController.createComment);

export default router

