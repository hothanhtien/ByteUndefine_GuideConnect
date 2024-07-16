import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { MessageSchema } from './message.model';

const { Schema } = mongoose;

const LocationSchema = new Schema({
    title: { type: String },
    content: { type: String },
}, {
    timestamps: true,
});

LocationSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

const LocationModel = mongoose.model('Location', LocationSchema);

export default LocationModel;
