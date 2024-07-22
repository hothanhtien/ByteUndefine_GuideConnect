
import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { MessageSchema } from './message.model';

const { Schema } = mongoose;



const BillPaymentSchema = new Schema({
    bill_id: { type: String, ref: 'Bill', required: true },
    payment_id: { type: String, ref: 'Payment', required: true },
    amount: { type: Number, required: true }
}, {
    timestamps: true,
});

BillPaymentSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

const BillPaymentModel = mongoose.model('BillPayment', BillPaymentSchema);

export default BillPaymentModel;