import express from 'express';
import uploadController from './upload.controller';
import { uploadCloud } from '../../middleware/uploadIMG'
import { uploadVideo } from '../../middleware/uploadVideo';
const router = express.Router();

//POST | lc/apis/auth/login
router.post('/uploadImage', uploadCloud.single('images'), uploadController.uploadImage)
router.post('/uploadVideo', uploadVideo.single('video'), uploadController.uploadVideo)



export default router;