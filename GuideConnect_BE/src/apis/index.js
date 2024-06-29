import express from 'express'

import auth from './auth/auth.router';
import {authenticateJWT} from '../middleware/authenticateJWT';
import userHome from './userHome/userHome.router';
import { authorizeRole } from '../middleware/authorizeRole ';
const router = express.Router();
router.use('/auth', auth)   
router.use('/userHome', authenticateJWT, authorizeRole(['user']) ,userHome)
// router.use('/guideHome', authenticateJWT, guideHome)
// router.use('/adminHome', authenticateJWT, adminHome)


export default router;