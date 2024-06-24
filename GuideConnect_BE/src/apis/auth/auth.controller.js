import authService from "./auth.service";
import userService from "../users/user.service";
import UserModel from "../../models/user.model";
class AuthController {
    login = async (req, res, next) => {
        const { userName, password } = req.body;
        // console.log('vào đây');
        console.log(userName, password)
        const token = await authService.login({userName, password});
        console.log('tokennnn', token)
        if (token == null) return res.status(401).json({ message: 'name or password sai'});
        return res.status(200).json({token: token});     
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
                role: req.body.role
            };
            const existingUser = await UserModel.findOne({ userName: newUser.userName });
            if (existingUser) {
                throw new Error('Username already exists');
            }
            const createdUser = await userService.createUser(newUser);
            return res.status(201).json(createdUser);
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({ error: 'Error registering user' });
        }
    }
}


export default new AuthController();