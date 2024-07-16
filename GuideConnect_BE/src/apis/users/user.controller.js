import UsersModel from "../../models/user.model";
class userController {
    getUserDetial = async (req, res, next) => {
        try {
           const idUser = req.params.id;
           console.log(idUser)
           const userDetial = await UsersModel.findOne({ _id: idUser});
           if (!userDetial) {
            res.status(200).json({ message: 'user not found'});
           }
            res.status(200).json({ userDetial });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    getAllUser = async (req, res, next) => {
        try {
            const allUser = await UsersModel.find({ role: 'user' });
            if (allUser.length === 0) {
                return res.status(200).json({ message: 'No users found' });
            }
            res.status(200).json({ allUser });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new userController();
