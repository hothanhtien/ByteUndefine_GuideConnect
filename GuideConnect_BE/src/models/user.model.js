import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

const UserSchema = new Schema({
    avatar: { type: String},
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    languages: [{ type: String, required: true }],
    workLocation: [{ type: String }],
    role: { type: String, default: 'user' }, 
    salt: { type: String, default: false },
    gender: { type: String, required: true},
    hometown: {type: String, required: true},
    hobbies: [{ type: String , required: true}],
    price: { type: Number },
    freeTimeBegin: { type: Date},
    freeEndTime: { type: Date},
    rating: { type: Number },
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
