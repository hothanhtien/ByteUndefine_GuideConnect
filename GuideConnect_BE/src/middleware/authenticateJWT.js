import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserIdentityService from '../service/authentication.service';

dotenv.config();

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        console.log('No token found');
        return res.sendStatus(401); 
    }
    //token.split(' ')[1];
    jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('lỗi')
            console.error('JWT verification error:', err);
            return res.sendStatus(403); 
        }
        UserIdentityService.assignUserRequestContext(decoded, req);
        // console.log('1', decoded)
        next();
    });
};

export { authenticateJWT };
