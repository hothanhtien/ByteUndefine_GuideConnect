import express from 'express';
import { authenticateJWT } from '../../middleware/authenticateJWT';
import tourController from './tour.controller';
import tourService from './tour.service';
const router = express.Router();


router.get('/', tourController.getAllTour)

router.post('/createTour', tourController.createTour)

router.post('/deleteTour/:id', tourController.deleteTour)

router.post('/updateTour/:id', tourController.updateTour)
export default router;
