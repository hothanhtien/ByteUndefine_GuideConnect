import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { MessageSchema } from './message.model';

const { Schema } = mongoose;

const ChatSchema = new Schema({
    user_id: { type: String },
    guide_id: { type: String },
    messages: [MessageSchema], 
    status: { type: String,}
}, {
    timestamps: true,
});

ChatSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

const ChatModel = mongoose.model('Chat', ChatSchema);

export default ChatModel;
