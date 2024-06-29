import UsersModel from "../../models/user.model";

class HomeController {
    getAllGuide = async (req, res, next) => {
        try {
            console.log('user đã login la',req.user);
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

    getGuideDetail = async (req, res, next) => {
        try {
            const guideDetail = await UsersModel.findOne({ _id: req.params.id });
            res.status(200).json({ guide: guideDetail });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getGuideByNameSearch = async (req, res, next) => {
        console.log('z11ô')
        try {
            let query = { role: 'guide' };
            const { name, gender, hometown } = req.query;

            if (name) {
                query.fullName = new RegExp(name, 'i');
            }
            if (gender) {
                query.gender = gender;
            }
            if (hometown) {
                query.hometown = new RegExp(hometown, 'i');
            }
         
            console.log(query)

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const searchResult = await UsersModel.find(query)
                                                .skip(skip)
                                                .limit(limit);
            
            const total = await UsersModel.countDocuments(query);

            res.status(200).json({ guides: searchResult, total, page, limit });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getGuideByPlaceSearch = async (req, res, next) => {
        try {
            let query = { role: 'guide' };
            const { workLocation, gender, tinh } = req.query;

            if (workLocation) {
                query.workLocation = { $in: [new RegExp(workLocation, 'i')] };
            }

            if (gender) {
                query.gender = gender;
            }
            if (tinh) {
                query.workLocation = new RegExp(tinh, 'i');
            } 

            // query.workLocation = { $exists: true, $ne: [] };

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const searchResult = await UsersModel.find(query)
                                                .skip(skip)
                                                .limit(limit);

            const total = await UsersModel.countDocuments(query);

            res.status(200).json({ guides: searchResult, total, page, limit });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new HomeController();
