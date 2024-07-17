import express from 'express';
import { authenticateJWT } from '../../middleware/authenticateJWT';
import chatController from './chat.controller';
const router = express.Router();

router.get('/:id', chatController.getChatDetial)

router.get('/getChatByuser/:idUser', chatController.getAllChat)

router.post('/start-chat', chatController.startChat);

router.post('/send-message', chatController.sendMessage);

router.delete('/deletechat/:id', chatController.deleteChat)

router.post('/editStatusChat/:chatId', chatController.editStatus)
export default router;
