
import ChatModel from "../../models/chat.model";
import ChatService from "./chat.service"
class chatController {
    getAllChat  = async (req, res, next) => {
        try {
          const idUser = req.params.idUser;
          const allChat = await ChatModel.find({
            $or: [{ user_id: idUser }, { guide_id: idUser }]
          });
          res.status(200).send({ allChat });
        } catch (error) {
          res.status(500).send(error.message);
        }
    };
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
    editStatus = async (req, res, next) => {
      const { status } = req.body;
      try {
          const chatUpdate = await ChatModel.findByIdAndUpdate({_id :req.params.chatId}, { status })
          res.status(200).send(chatUpdate);
      } catch (error) {
          res.status(500).send(error.message);
      }
    };
    getChatDetial = async (req, res, next) => {
      try {
          const idChat = req.params.id;
          const chat = await ChatModel.findOne({ _id: idChat });
          res.status(200).send(chat);
      } catch (error) {
          res.status(500).send(error.message);
      }
    };
    deleteChat = async (req, res, next) => {
      try {
        const idChat = req.params.id;
        const result = await ChatModel.findByIdAndDelete(idChat);
        if (!result) {
            return res.status(404).send("Chat not found");
        }
        res.status(200).json({ message: "Chat deleted successfully" });
      } catch (error) {
          res.status(500).send(error.message);
      }
    };
}


export default new chatController();