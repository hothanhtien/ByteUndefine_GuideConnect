import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

const MessageSchema = new Schema({
   sender_id: { type: String },
   message: { type: String },
}, {
    timestamps: true,
});

MessageSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

const MessageModel = mongoose.model('Message', MessageSchema);

export { MessageSchema, MessageModel };
