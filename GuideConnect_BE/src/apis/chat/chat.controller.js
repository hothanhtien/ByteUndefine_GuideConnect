
import ChatService from "./chat.service"
class chatController {
    startChat = async (req, res, next) => {
        const { userId, guideId } = req.body;
        try {
          const chat = await ChatService.startChat(userId, guideId);
          res.status(200).send({ chatId: chat._id });
        } catch (error) {
          res.status(500).send(error.message);
        }
    };
    sendMessage = async (req, res, next) => {
    const { chatId, senderId, message } = req.body;
    try {
        const chat = await ChatService.sendMessage(req.io, chatId, senderId, message);
        res.status(200).send(chat);
    } catch (error) {
        res.status(500).send(error.message);
    }
    };
}


export default new chatController();