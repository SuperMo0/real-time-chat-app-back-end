import { Router } from "express";
import protect from '../middlewares/protect.js'
import * as controller from '../controllers/user.controller.js'
import multer from 'multer'

let upload = multer();

const router = Router();

router.use(protect);

router.put('/', upload.single('avatar'), controller.updateProfile)


export default router