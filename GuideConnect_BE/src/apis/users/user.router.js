import express from 'express';
import userController from './user.controller';
import { authenticateJWT } from '../../middleware/authenticateJWT';

const router = express.Router();

router.get('/getAllUser/:idGuide', userController.getAllUser)
router.get('/:id', userController.getUserDetial)

 

export default router;
