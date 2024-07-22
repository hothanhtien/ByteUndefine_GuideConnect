
import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { MessageSchema } from './message.model';

const { Schema } = mongoose;

const BillSchema = new Schema({
    fee_type: { type: String, required: true },
    fee: { type: Number, required: true },
    description: { type: String, required: true },
    create_by: { type: String, ref: 'User', required: true },
    payer: { type: String, ref: 'User', required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    due_at: { type: Date, required: true },
    is_paid: { type: Boolean, default: false }
}, {
    timestamps: true,
});


BillSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

const BillModel = mongoose.model('Bill', BillSchema);

export default BillModel;