// routes/orders.js
import express, { response } from 'express'
import Order from '../model/Order.js';
const router = express.Router();
import Razorpay from 'razorpay'

// Create a new order
router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        const razorpay = new Razorpay({
            key_id: process.env.key_id,
            key_secret: process.env.key_secret,
        });
        const options = {
            amount: order.TotalAmount * 100, // Amount in smallest currency unit (e.g., paise for INR)
            currency: 'INR',
            receipt: `receipt_${new Date().getTime()}`,
            payment_capture: 1,
        };

        const response = await razorpay.orders.create(options);
        order.razorpay_order_id = response.id; // Save the Razorpay order ID to the order document

        const savedOrder = await order.save();

        res.status(201).json({
            _id: savedOrder._id,
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.patch('/orders/:orderId/status', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.OrderStatus = status;
        await order.save();

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Update the order with razorpay_payment_id
router.patch('/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { razorpay_payment_id: req.body.razorpay_payment_id },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/payment/:paymentId', async (req, res) => {
    const { paymentId } = req.params;
    const razorpay = new Razorpay({
        key_id: process.env.key_id,
        key_secret: process.env.key_secret,
    });
    try {
        const payment = await razorpay.payments.fetch(paymentId)
        if (!payment) {
            return res.status(500).json("error")
        }
        res.json({
            status: payment.status,
            method: payment.method,
            amount: payment.amount,
            currency: payment.currency
        })
    } catch (error) {
        res.status(500).json("faild")
    }
})

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get orders by vendor ID
router.get('/vendor/:vendorId', async (req, res) => {
    try {
        const { vendorId } = req.params;
        const orders = await Order.find({ vendorId });
        res.json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get orders by customer ID
router.get('/customer/:customerId', async (req, res) => {
    try {
        const { customerId } = req.params;
        const orders = await Order.find({ customerId });
        res.json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an order


// Update the order with razorpay_payment_id
// router.patch('/:id', async (req, res) => {
//     try {
//         const updatedOrder = await Order.findByIdAndUpdate(
//             req.params.id,
//             { razorpay_payment_id: req.body.razorpay_payment_id },
//             { new: true }
//         );
//         res.status(200).json(updatedOrder);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// Delete an order
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndDelete(id);
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




export default router;
