import express from 'express';
import AdminController from './adminHome.controller';

const router = express.Router();


router.get('/', AdminController.getAllGuide)
router.get('/:id', AdminController.getdetial)
router.post('/create', AdminController.createGuide)
router.delete('/:id', AdminController.deleteGuide)


export default router;