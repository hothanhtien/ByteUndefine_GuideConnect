// authorization.middleware.js
import UsersModel from "../models/user.model";
const authorizeRole = (roles) => {
    return async (req, res, next) => {
        const userReq = req.user;
        console.log(userReq.id)
        const user = await UsersModel.findById(userReq.id);
        // console.log(user)
        if (!user) {
            return res.sendStatus(401); // Unauthorized
        }
        if (!roles.includes(user.role)) {
            return res.sendStatus(403); // Forbidden
        }
        next();
    };
};

export { authorizeRole };
