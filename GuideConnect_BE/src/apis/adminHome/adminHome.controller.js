import UsersModel from "../../models/user.model";
import userService from "../users/user.service";
class AuthController {
    getAllGuide = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1; // Trang hiện tại
            const limit = parseInt(req.query.limit) || 10; // Số lượng mục trên mỗi trang
            const skip = (page - 1) * limit; // Số mục cần bỏ qua
            
            const listGuide = await UsersModel.find({ role: 'guide' })
                                              .skip(skip)
                                              .limit(limit);
            const total = await UsersModel.countDocuments({ role: 'guide' });

            res.status(200).json({ guides: listGuide, total, page, limit });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    getdetial = async (req, res, next) => {
        try {
            const id = req.params.id;
            console.log("zoooo nè",id);
            if (!id) {
                res.status(400).json({ message: 'Invalid user ID' });
            }

            const userDetial = await UsersModel.findOne({ _id: id });
            res.status(200).json({ userDetial })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    deleteGuide = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            const deletedGuide = await UsersModel.deleteOne({ _id: id });

            if (!deletedGuide) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    createGuide = async (req, res, next) => {
        // console.log('zô đây ko')
        try {
            const {
                avatar, fullName, phoneNumber, userName, email, password,
                languages, workLocation, role, gender, hometown, hobbies, price,
                freeTimeBegin, freeEndTime, rating, age
            } = req.body;
            
            if (!fullName || !phoneNumber || !userName || !email || !password || !languages || !workLocation || !gender || !hometown) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const newGuide = new UsersModel({
                avatar,
                fullName,
                phoneNumber,
                userName,
                email,
                password, 
                languages,
                workLocation,
                role, 
                gender,
                hometown,
                hobbies,
                price,
                freeTimeBegin,
                freeEndTime,
                rating,
                age
            });

            
            const createGuide = await userService.createUser(newGuide);
            res.status(201).json({ message: 'Guide created successfully', guide: createGuide });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}


export default new AuthController();