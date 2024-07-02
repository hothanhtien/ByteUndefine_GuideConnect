import authService from "./auth.service";
import userService from "../users/user.service";
import UserModel from "../../models/user.model";
import checkInforRes  from "../../service/checkIn4Res";
class AuthController {
    login = async (req, res, next) => {
        const { userName, password } = req.body;
        // console.log('vào đây');
        try {
            const result = await authService.login({ userName, password });
            if (result instanceof Error) {
                return res.status(401).json({ message: result.message });
            }
            return res.status(200).json({ token: result.token, role: result.role });
        } catch (error) { 
            console.error('Error logging in:', error);
            return res.status(500).json({ error: 'Internal server error' });
        } 
    }
    register = async (req, res, next) => {
        try {
            const newUser = {
                fullName: req.body.fullName,
                phoneNumber: req.body.phoneNumber,
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                nationality: req.body.nationality,
                languages: req.body.languages,
                acceptedPolicies: req.body.acceptedPolicies,
                role: req.body.role,
                gender: req.body.gender,
                hometown: req.body.hometown,
                workLocation: req.body.workLocation
            };
            try {
                await checkInforRes(newUser);
            } catch (errors) { 
                return res.status(409).json({ errors: errors });
            }
            const createdUser = await userService.createUser(newUser);
            return res.status(201).json(createdUser);
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({ error: 'Error registering user' });
        }
    }
    forgotPassword = async (req, res, next) => {
        try {
            const data = req.body;
            const result = await authService.forgotPassword(data);
            res.status(200).json({message: 'Send Email Success', data: result })
          } catch (error) {
            res.status(401).json({ message: 'Send Email  Failed', error: error });
            console.log("err",error);
          }
    }
    resetPassword = async (req, res, next) => {
        try {
            const data = req;
            const result = await authService.resetPassword(data);
            res.status(200).json({ message: 'Reset Password Success', data: result });
        } catch (error) {
            console.error('Error resetting password:', error);
            res.status(500).json({ message: 'Reset Password Failed', error: error });
        }
    }
}


export default new AuthController();