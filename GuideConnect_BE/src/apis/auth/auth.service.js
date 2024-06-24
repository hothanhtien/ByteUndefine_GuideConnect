
import { hashPasswordSalt } from '../../service/hash.service'
import  UserIdentityService  from '../../service/authentication.service'
import UserModel from '../../models/user.model'
class AuthService {
    async login(userLogin) {
        try {
            
            console.log('vào đây')
            console.log(userLogin.userName)
            const user = await UserModel.findOne({ userName: userLogin.userName });
           
            console.log(user)
            if (user==null) {
                return new Error('User not found');
            }
            console.log('user,salt', user.salt);
            console.log('userLogin.pass', userLogin.password);
            const password = await hashPasswordSalt(user.salt, userLogin.password);
            // console.log('pass', password);
            // console.log('passmau', user.password)
            if (password !== user.password) {
                return new Error('MK sai');
            }
         
            const token = await UserIdentityService.sign(user);
            console.log('cao day nh')
            console.log('token', token)
            console.log('zoo')
            return token;
        }
        catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
}

export default new AuthService();