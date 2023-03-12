import express from 'express'
import queryController from '../controllers/queryController.js'

const router=express.Router()

router.get('/',queryController.getquery)
router.post('/',queryController.createquery)

export default router;