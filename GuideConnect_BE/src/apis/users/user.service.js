import { hashPassword } from "../../service/hash.service";
import UsersModel  from "../../models/user.model";
class UserService {
    async createUser(user) {
        try {
            const { salt , passwordHashed } = hashPassword(user.password);
            console.log("salt", salt + "passwordHashed", passwordHashed);
            user.salt = salt;
            user.password = passwordHashed;
            user.forgetPasswordToken = passwordHashed;
            // tạo user mới
            const newUser = new UsersModel(user);
            console.log(newUser)
            await newUser.save();
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
}

export default new UserService();