import express from 'express'

import auth from './auth/auth.router';
// import user from './users/users.router';

const router = express.Router();
router.use('/auth', auth)
// router.use('/users', user) 

export default router;