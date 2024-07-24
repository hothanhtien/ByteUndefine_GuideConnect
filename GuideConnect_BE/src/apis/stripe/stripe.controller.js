// import { Payment, Bill, BillPayment } from '../../models/stripe.model';
import Payment from '../../models/payment.model';
import Bill from '../../models/bill.model';
import BillPayment from '../../models/billpayment.model';
const dotenv = require('dotenv');
dotenv.config();
import stripePackage from 'stripe';
import mongoose from 'mongoose';

import TourModel from "../../models/tour.model";
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);
// const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET || '';
class StripeController {
    async getAllPayments(req, res) {
        try {
            const payments = await Payment.find();
            res.status(200).json({ payments });
        } catch (error) {
            console.error('Error getting payments:', error);
            res.status(500).json({ error: 'An error occurred while getting the payments' });
        }
    }

    async getPaymentDetail(req, res) {
        try {
            const payment_id = req.params.payment_id;
            const paymentDetail = await Payment.findById(payment_id).populate('bills');
            res.status(200).json({ paymentDetail });
        } catch (error) {
            console.error('Error getting payment detail:', error);
            res.status(500).json({ error: 'An error occurred while getting the payment detail' });
        }
    }

    async getPaymentsByUserId(req, res) {
        try {
            const userId = req.params.user_id;
            const payments = await Payment.find({ user_id: userId });
            res.status(200).json({ payments });
        } catch (error) {
            console.error('Error getting payments by user ID:', error);
            res.status(500).json({ error: 'An error occurred while getting the payments' });
        }
    }

    async createBill(req, res) {
        try {
            const { fee_type, fee, description, create_by, payer, month, year } = req.body;
            const created_at = new Date();
            const due_at = new Date();
            due_at.setDate(due_at.getDate() + 30);
    
            const newBill = new Bill({
                fee_type,
                fee,
                description,
                create_by,
                payer, 
                year,
                month,
                created_at,
                due_at,
            });
    
            await newBill.save();
            res.status(200).json({ message: 'Bill created successfully', bill: newBill });
        } catch (error) {
            console.error('Error creating bill:', error);
            res.status(500).json({ error: 'An error occurred while creating the bill' });
        }
    }

    async updateBill(req, res) {
        const billId = req.params.id;
        const { fee_type, fee, description, payer, year, month } = req.body;

        try {
            const updatedBill = await Bill.findByIdAndUpdate(billId, {
                fee_type,
                fee,
                description,
                payer,
                year,
                month,
            }, { new: true });

            if (updatedBill) {
                return res.json({ message: 'Bill updated successfully', bill: updatedBill });
            } else {
                return res.status(404).json({ message: 'Bill not found' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getBillByID(req, res) {
        const billId = req.params.id;

        try {
            const bill = await Bill.findById(billId);
            if (bill) {
                return res.json(bill);
            } else {
                return res.status(404).json({ message: 'Bill not found' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteBill(req, res) {
        const billId = req.params.id;

        try {
            const deletedBill = await Bill.findByIdAndDelete(billId);
            if (deletedBill) {
                return res.json({ message: 'Bill deleted successfully' });
            } else {
                return res.status(404).json({ message: 'Bill not found' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getUnpaidBill(req, res) {
        try {
            const userId = req.params.user_id;
            const unpaidBills = await Bill.aggregate([
                {
                    $match: { payer: mongoose.Types.ObjectId(userId) }
                },
                {
                    $lookup: {
                        from: 'billpayments',
                        localField: '_id',
                        foreignField: 'bill_id',
                        as: 'payments'
                    }
                },
                {
                    $addFields: {
                        unpaid_fee: {
                            $subtract: ['$fee', { $sum: '$payments.amount' }]
                        }
                    }
                },
                {
                    $match: { unpaid_fee: { $gt: 0 } }
                }
            ]);
            res.status(200).json({ unpaidBills });
        } catch (error) {
            console.error('Error getting unpaid bills:', error);
            res.status(500).json({ error: 'An error occurred while getting the unpaid bills' });
        }
    }

    // async createSessionPayment(req, res) {
    //     try {
    //         const session = await stripe.checkout.sessions.create({
    //             payment_method_types: ['card'],
    //             mode: 'payment',
    //             success_url: `${process.env.BASE_URL_FE}/success?session_id={CHECKOUT_SESSION_ID}`, // Cập nhật URL hợp lệ
    //             cancel_url: `${process.env.BASE_URL_FE}/cancel`, // Cập nhật URL hợp lệ
    //             line_items: req.body.items.map(item => ({
    //                 price_data: {
    //                     currency: 'vnd',
    //                     product_data: {
    //                         name: `Tiền Tháng ${item.month}`,
    //                         description: item.description,
    //                         metadata: { bill_id: item.bill_id }
    //                     },
    //                     unit_amount: item.price ? item.price : 200000
    //                 },
    //                 quantity: 1
    //             })),
    //             metadata: {
    //                 user_id: req.body.user_id,
    //                 description: req.body.description
    //             }
    //         });

    //         res.json({ url: session.url });
    //     } catch (error) {
    //         console.error('Error creating session payment:', error);
    //         res.status(500).json({ error: 'An error occurred while creating the session payment' });
    //     }
    // }

    async createSessionPayment(req, res) {
        try {
            const { items, user_id, guide_id, description } = req.body; 
            const tour = await TourModel.findOneAndUpdate(
                {user_id: user_id, guide_id: guide_id},
                {status: 'activity' },
                { new: true }
            )
            console.log('tour', tour)
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: 'exp://192.168.1.10:8081/PaymentSucess', 
                cancel_url: 'exp://192.168.1.10:8081/PaymentFailed', 
                line_items: items.map(item => ({
                    price_data: {
                        currency: 'vnd',
                        product_data: {
                            name: item.name, 
                            description: item.description,
                        },
                        unit_amount: item.price, 
                    },
                    quantity: item.quantity, 
                })),
                metadata: {
                    user_id: user_id,
                    guide_id: guide_id, 
                    description: description,
                }
            });
            
            res.status(200).json({ url: session.url });
        } catch (error) {
            console.error('Error creating session payment:', error);
            res.status(500).json({ error: 'An error occurred while creating the session payment' });
        }
    }
    

    async handleWebhook(req, res) {
        const sig = req.headers['stripe-signature'];
        const rawBody = req.rawBody; 
    
        let event;
    
        try {
            event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
            console.log('Webhook event constructed:', event);
        } catch (err) {
            console.error(`Webhook Error: ${err.message}`);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
    
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                console.log('Checkout session completed:', session);
    
                try {
                    const payment = new Payment({
                        amount_money: session.amount_total,
                        user_id: session.metadata.user_id,
                        guide_id: session.metadata.guide_id,
                        account_name: session.customer_details.name,
                        description: session.metadata.description,
                        pay_method: session.payment_method_types,
                        created_at: new Date(session.created * 1000)
                    });
                    console.log(payment);
                    await payment.save();

                    
                    console.log('Payment saved:', payment);
    
                } catch (err) {
                    console.error('Error processing checkout session completed:', err);
                    return res.status(500).send('Internal Server Error');
                }
                break;
    
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    
        res.status(200).send('Webhook received');
    }

    

    async handlePaymentSuccess(req, res) {
        const payment_id = req.body.payment_id;

        try {
            const payment = await Payment.findById(payment_id);
            if (!payment) {
                return res.status(404).json({ message: 'Payment not found' });
            }

            const billPayment = await BillPayment.findOne({ payment_id: payment._id });
            if (!billPayment) {
                return res.status(404).json({ message: 'Bill payment not found' });
            }

            const bill = await Bill.findById(billPayment.bill_id);
            if (!bill) {
                return res.status(404).json({ message: 'Bill not found' });
            }

            bill.is_paid = true;
            await bill.save();

            res.status(200).json({ message: 'Payment success handled', bill });
        } catch (error) {
            console.error('Error handling payment success:', error);
            res.status(500).json({ error: 'An error occurred while handling payment success' });
        }
    }
}

export default new StripeController();
