import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

const UserSchema = new Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    nationality: { type: String, required: true },
    languages: { type: String, required: true },
    workLocation: [{ type: String }],
    role: { type: String, default: false },
    acceptedPolicies: { type: Boolean, required: true },
    salt: { type: String, default: false },
    gender: { type: String},
    hometown: {type: String},
    forgetPasswordToken: { type: String },
    forgetPasswordTokenTime: { type: String },
}, {
    timestamps: true,
});

UserSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

const UsersModel = mongoose.model('User', UserSchema);

export default UsersModel;
