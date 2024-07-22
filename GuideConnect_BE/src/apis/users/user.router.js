import express from 'express';
import userController from './user.controller';
import { authenticateJWT } from '../../middleware/authenticateJWT';

const router = express.Router();

router.get('/', userController.getAll)
router.get('/getAllUser/:idGuide', userController.getAllUser)
router.get('/:id', userController.getUserDetial);
router.post('/update/:id', userController.updateUser);

export default router;
