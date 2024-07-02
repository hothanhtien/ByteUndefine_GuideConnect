import express from 'express';
import { authenticateJWT } from '../../middleware/authenticateJWT';
import chatController from './chat.controller';
const router = express.Router();



router.post('/start-chat', chatController.startChat);

router.post('/send-message', chatController.sendMessage);


export default router;
