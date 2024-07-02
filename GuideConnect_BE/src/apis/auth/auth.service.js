
import { hashPasswordSalt } from '../../service/hash.service'
import  UserIdentityService  from '../../service/authentication.service'
import UserModel from '../../models/user.model'
import { mailService } from '../../service/mail.service'
const dotenv = require('dotenv');
dotenv.config();
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
                return new Error('Invalid password');
            }
         
            const token = await UserIdentityService.sign(user);
            return { token, role: user.role };
        }
        catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    async forgotPassword(data) {
        const mail = data.email;
        const user = await UserModel.find({ email: mail});
        console.log('Người dùng trước khi update token', user)
        // console.log(user);
        if (!user) return new Error('User not found');
        console.log('check nbe', user[0].userName,  user[0].email)
        const payloadUser = {
            id: user[0]._id,
            userName: user[0].userName,
            email: user[0].email
          };
        const token = await UserIdentityService.sign(payloadUser);
        const time = new Date(Date.now() + 10 * 60 * 1000);
      
        await UserModel.updateOne(
            { email: mail },
            { 
                $set: { 
                    forgetPasswordToken: token, 
                    forgetPasswordTokenTime: time 
                } 
            }
        );
        // const user2 = await UserModel.find({ email: mail});
        // console.log('người dùng sau khi update token', user2);

        //gửi email đặt lại mật khẩu
        const resetUrl2 = `${process.env.BASE_URL_FE}/apis/auth/resetPassword?token=${token}`;
        
        // console.log('------------EMAIL_USER',  process.env.EMAIL_USER,mail)
        const mailOptions = {
            emailFrom: process.env.EMAIL_USER,
            emailTo: mail,
            subject: "Yêu cầu đặt lại mật khẩu",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                        <h2 style="text-align: center; color: #072541;">Đặt lại mật khẩu của bạn</h2>
                        <p>Xin chào,</p>
                        <p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấp vào nút dưới đây để đặt lại mật khẩu ngay lập tức:</p>
                        <div style="text-align: center; margin: 20px 0;">
                            <a 
                                href="${resetUrl2}" 
                                style="
                                    background-color: #5272F2; 
                                    color: white;
                                    padding: 12px 24px;
                                    text-decoration: none;
                                    border-radius: 4px;
                                    display: inline-block;
                                    font-size: 16px;
                                    transition: background-color 0.3s ease;
                                "
                                onmouseover="this.style.backgroundColor='#072541';"
                                onmouseout="this.style.backgroundColor='#5272F2';"
                            >
                                Đặt lại mật khẩu ngay
                            </a>
                        </div>
                        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
                        <p>Trân trọng,</p>
                        <p>Đội ngũ hỗ trợ</p>
                        <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 10px; text-align: center; color: #777;">
                            <small>Rất vui được làm việc với bạn</small>
                        </div>
                    </div>
                </div>
            `,
        };
        
    
        try {
            console.log('----------------------------------')
            await mailService.sendEmail(mailOptions);
            console.log('Password reset and email sent successfully');
            return { message: 'Password reset and email sent successfully' };
        } catch (error) {
            console.error('Failed to send email:', error);
            return { message: 'Failed to send email', error };
        }


        // console.log(mail);
    }

    async resetPassword(data) {
        const token = data.query.token;
        const newPassword = data.body.newPassword;

        if (!token) {
            throw new Error('Token is required');
        }

        const userDecoded = UserIdentityService.verify(token);
        console.log('user endcode', userDecoded)    
        if (!userDecoded) {
            throw new Error('Invalid token');
        }

        const user = await UserModel.findOne({ _id: userDecoded.id });
        console.log("userrr", user)
        if (!user || Date.now() > user.forgetPasswordTokenTime) {
            throw new Error('Invalid or expired password reset token');
        }   

        const hashedPassword = await hashPasswordSalt(user.salt, newPassword);

        await UserModel.updateOne(
            { _id: userDecoded.id },
            { 
                $set: { 
                    password: hashedPassword,
                    forgetPasswordToken: null, 
                    forgetPasswordTokenTime: null 
                } 
            }
        );

        return { message: 'Password reset successfully' };
    }
    
}

export default new AuthService();