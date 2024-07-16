import express from 'express'

import auth from './auth/auth.router';
import {authenticateJWT} from '../middleware/authenticateJWT';
import userHome from './userHome/userHome.router';
import chat from './chat/chat.router'
import upload from './upload/upload.router'
import adminHome from './adminHome/adminHome.router'
import user from './users/user.router'
import tour from './tour/tour.router'
import { authorizeRole } from '../middleware/authorizeRole ';
import { uploadCloud } from '../middleware/uploadIMG'
import { uploadVideo } from '../middleware/uploadVideo'
const router = express.Router();
router.use('/auth', auth)
router.use('/chat', authenticateJWT, authorizeRole(['user', 'guide']),  chat)  
router.use('/user', authenticateJWT, authorizeRole(['user', 'guide', 'admin']), user) 
router.use('/userHome', authenticateJWT, authorizeRole(['user']) , userHome)
router.use('/adminHome', authenticateJWT, authorizeRole(['guide']), adminHome)
// router.use('/upload', authenticateJWT, authorizeRole(['user', 'admin']), uploadCloud.array('images', 10), upload)
router.use('/upload', authenticateJWT, authorizeRole(['user', 'guide']), upload)
router.use('/tour', authenticateJWT, tour)
// router.use('/guideHome', authenticateJWT, authorizeRole(['guide']) , guideHome)
// router.use('/adminHome', authenticateJWT, adminHome)




export default router;