import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserIdentityService from '../service/authentication.service';

dotenv.config();

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log('Auth Header:', authHeader); // Log the auth header for debugging
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No token found');
        return res.sendStatus(401); 
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('JWT verification error:', err);
            return res.sendStatus(403); 
        }
        UserIdentityService.assignUserRequestContext(decoded, req);
        next();
    });
};

export { authenticateJWT };
