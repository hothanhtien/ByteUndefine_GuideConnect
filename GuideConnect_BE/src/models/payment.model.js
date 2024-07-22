import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { MessageSchema } from './message.model';

const { Schema } = mongoose;



const PaymentSchema = new Schema({
    amount_money: { type: Number, required: true },
    user_id: { type: String, ref: 'User', required: true },
    account_name: { type: String, required: true },
    description: { type: String, required: true },
    pay_method: { type: [String], required: true }
}, {
    timestamps: true,
});


PaymentSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

const PaymentModel = mongoose.model('Payment', PaymentSchema);

export default PaymentModel;