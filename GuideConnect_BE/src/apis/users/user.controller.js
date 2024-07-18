import UsersModel from "../../models/user.model";
import ChatModel from "../../models/chat.model"
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
        const allChat = await ChatModel.find({
            $or: [{ status: "potential" }, { status: "wait" }], guide_id: req.params.idGuide
        });
        const userIds = Array.from(new Set(allChat.map(chat => chat.user_id)));
        const users = await UsersModel.find({ _id: { $in: userIds } });
        res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    updateUser = async (req, res, next) => {
        try {
            const idUpdate = req.params.id;
            const updates = req.body;

            const updatedUser = await UsersModel.findByIdAndUpdate(idUpdate, updates, { new: true });

            if (!updatedUser) {
                res.status(404).json({ message: 'user not found' });
                return;
            }

            res.status(200).json({ updatedUser });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new userController();
