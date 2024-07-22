import express from 'express';
import { authenticateJWT } from '../../middleware/authenticateJWT';
import stripeController from './stripe.controller';
const router = express.Router();

router.get('/getAllPayments', stripeController.getAllPayments);
router.get('/getPaymentDetail/:payment_id', stripeController.getPaymentDetail);
router.get('/getPaymentsByUserId/:user_id', stripeController.getPaymentsByUserId);
router.post('/createBill', stripeController.createBill);  //guide tạo hóa đơn
router.put('/updateBill/:id', stripeController.updateBill); //check
router.get('/getBillByID/:id', stripeController.getBillByID);  //check
router.delete('/deleteBill/:id', stripeController.deleteBill);  //check
router.get('/getUnpaidBill/:user_id', stripeController.getUnpaidBill);
router.post('/createSessionPayment', express.json(), express.urlencoded({ extended: true }), stripeController.createSessionPayment);
router.post('/handleWebhook', express.raw({type: 'application/json'}), stripeController.handleWebhook);
router.post('/handlePaymentSuccess', stripeController.handlePaymentSuccess);



export default router;
