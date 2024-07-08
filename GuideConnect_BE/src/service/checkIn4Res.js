import UserModel from "../models/user.model";

const checkInforRes = async (user) => {
    const errors = [];

    try {
        // Kiểm tra userName đã tồn tại chưa
        const existingUser = await UserModel.findOne({ userName: user.userName });
        if (existingUser) {
            errors.push('Username already exists');
        }
        
        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            errors.push('Invalid email format');
        }

        // Kiểm tra email đã tồn tại chưa
        const existingEmail = await UserModel.findOne({ email: user.email });
        if (existingEmail) {
            errors.push('Email already exists');
        }

        if (errors.length > 0) {
            throw errors;
        }
    } catch (error) {
        throw error;
    }
}

export default checkInforRes;
