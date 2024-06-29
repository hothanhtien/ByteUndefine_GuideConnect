import express from 'express';
import AuthController from './auth.controller';

const router = express.Router();

//POST | lc/apis/auth/login
router.post('/login', AuthController.login)
//POST | lc/apis/auth/register
router.post('/register', AuthController.register)
//POST | lc/apis/auth/forgotPassword
router.post('/forgot-password', AuthController.forgotPassword)
//POST | lc/apis/auth/resetPassword
router.post('/reset-password', AuthController.resetPassword); 


export default router;