import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

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

export { PaymentModel, BillModel, BillPaymentModel };
