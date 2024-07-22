import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

const PaymentDemoSchema = new Schema({
   user_id: { type: String },
   guide_id: { type: String},
   content: { type: String },
   price: { type: Number}
}, {
    timestamps: true,
});

PaymentDemoSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});


const PaymentDemoModel = mongoose.model('PaymentDemo', PaymentDemoSchema);

export default PaymentDemoModel ;
