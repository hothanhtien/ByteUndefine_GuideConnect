import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UsersModel from "../../models/user.model";
dotenv.config();

class uploadService {
    async updateUser(token, result) {
        try {
            const decoded = await new Promise((resolve, reject) => {
                jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(decoded);
                });
            });

            const user = await UsersModel.findById(decoded.id);
            if (!user) {
                return { success: false, status: 404, message: "User not found" };
            }

            user.avatar = result.url;
            await user.save();

            return {
                success: true,
                data: {
                    url: result.url,
                    publicId: result.public_id
                }
            };
        } catch (error) {
            console.error('Error updating user:', error);
            if (error.name === 'JsonWebTokenError') {
                return { success: false, status: 403, message: "JWT verification error" };
            }
            return { success: false, status: 500, message: "Database error" };
        }
    }
}

export default new uploadService();
