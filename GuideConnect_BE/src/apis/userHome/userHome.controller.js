import UsersModel from "../../models/user.model";
import LocationModel from "../../models/location.model";
class HomeController {
    getAllGuide = async (req, res, next) => {
        try {
            console.log('user đã login la', req.user);
            const page = parseInt(req.query.page) || 1; // Trang hiện tại
            const limit = parseInt(req.query.limit) || 10; // Số lượng mục trên mỗi trang
            const skip = (page - 1) * limit; // Số mục cần bỏ qua
            
            const userLogin = await UsersModel.findOne({ _id: req.user.id})

            const listGuide = await UsersModel.find({ role: 'guide' })
                                              .skip(skip)
                                              .limit(limit);
            const total = await UsersModel.countDocuments({ role: 'guide' });

            res.status(200).json({ guides: listGuide, total, page, limit, userLogin });
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


    getGuideByPlaceSearch = async (req, res, next) => {
        try {
            let query = { role: { $in: ['guide', 'local'] } }; 
            const { workLocation, startTime, endTime, languages, gender, hometown, hobbies, sortBy, role } = req.query;
            // sortBy: rating, giá: thấp cao, tuổi
            console.log(req.query.workLocation)
            if (workLocation) {
                query.workLocation = { $in: [new RegExp(workLocation, 'i')] };
            }
            if (role) {
                query.role = role;
            }  
            console.log(startTime, endTime)
            if (startTime && endTime) {
                query.freeTimeBegin = { $lte: new Date(startTime) };
                query.freeEndTime = { $gte: new Date(endTime) }; 
            }
            console.log(req.query.languages)
            if (languages) {
                query.languages = { $in: [new RegExp(languages, 'i')] };
            }

            if (hometown) {
                query.hometown = { $in: [new RegExp(hometown, 'i')]};
            }

            if (hobbies) {
                query.hobbies = { $in: [new RegExp(hobbies, 'i')]};
            }

            if (gender) { 
                query.gender = gender;
            }

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            console.log(query)
            console.log(sortBy)
            let sortCriteria = {};
            if (sortBy === 'price') {
                sortCriteria = { price: 1 };  
            } else if (sortBy === 'age') {
                sortCriteria = { age: 1 }; 
            }
            
            const searchResult = await UsersModel.find(query)
                                                .sort(sortCriteria)
                                                .skip(skip)
                                                .limit(limit);

            const total = await UsersModel.countDocuments(query);
            const location = await LocationModel.find({ title: { $in: [new RegExp(workLocation, 'i')] } });
            res.status(200).json({ guides: searchResult, total, page, limit, location  });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    test = async (req, res, next) => {
    try {
          
        res.status(200).json({ "ok": true });
    } catch (error) {
        res.status(500).send(error.message);
    }
}
}

export default new HomeController();
