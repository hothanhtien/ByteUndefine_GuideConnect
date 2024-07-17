import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { MessageSchema } from './message.model';

const { Schema } = mongoose;

const TourSchema = new Schema({
    user_id: { type: String, required: true },
    guide_id: { type: String, required: true },
    Tuorlocation: [{ type: String, required: true }],  
    schedule: { type: String, required: true },
    numberUser: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    tourType: { type: String, required: true },
    price: { type: Number, require: true},
    status: { type: String }
}, {
    timestamps: true,
});

TourSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

const TourModel = mongoose.model('Tour', TourSchema);

export default TourModel;
