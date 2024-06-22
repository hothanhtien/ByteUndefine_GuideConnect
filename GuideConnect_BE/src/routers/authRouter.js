import express from 'express';
const router = express.Router();
import auth from '../controllers/authControler'

// lc/auth/login
router.get('/login', auth.login)


export default router;