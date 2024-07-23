import express from 'express';
import { authenticateJWT } from '../../middleware/authenticateJWT';
import tourController from './tour.controller';
import tourService from './tour.service';
const router = express.Router();


router.get('/', tourController.getAllTour)

router.get('/getAllTourByGuideId/:guideId', tourController.getTourByGuide)
 
router.get('/getAllTourByUserId/:userId', tourController.getTourByUser)

router.get('/:id', tourController.getTourDetial)

router.post('/createTour', tourController.createTour)

router.post('/editStatus/:id', tourController.editStatusTuor)

router.post('/deleteTour/:id', tourController.deleteTour)

router.post('/updateTour/:id', tourController.updateTour)

export default router;
