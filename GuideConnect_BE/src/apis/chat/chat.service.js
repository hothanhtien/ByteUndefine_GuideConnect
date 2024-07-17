import ChatModel from '../../models/chat.model';
import mongoose from 'mongoose';

class ChatService {
  startChat = async (userId, guideId) => {
    let chat = await ChatModel.findOne({ user_id: userId, guide_id: guideId });
    if (!chat) {
      chat = new ChatModel({
        user_id: userId,
        guide_id: guideId,
        messages: [],
        status: 'wait'
      });
  
      await chat.save();
    }   
    return chat;
  };

  sendMessage = async (io, chatId, senderId, message) => {
    let chat = await ChatModel.findById(chatId);
    if (chat) { 
      const newMessage = { sender_id: senderId, message};
      chat.messages.push(newMessage);
      await chat.save();
      io.to(chatId).emit('newMessage', newMessage);
      return chat;
    } else {
      throw new Error('Chat not found');
    }
  };
}

export default new ChatService();
