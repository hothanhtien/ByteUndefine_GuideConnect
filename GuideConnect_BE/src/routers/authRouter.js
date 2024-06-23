import express from 'express';
const router = express.Router();
import auth from '../app/controllers/authControler'

// lc/auth/login
router.get('/login', auth.login)


export default router;