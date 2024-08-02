// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//     vendorId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Vendor',
//         required: true,
//     },
//     customerId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Customer',
//         required: true,
//     },
//     contactNumber: {
//         type: String,
//         required: true,
//     },
//     flightNumber: {
//         type: String,
//         required: true,
//     },
//     airline: {
//         type: String,
//         required: true,
//     },
//     departureAirport: {
//         type: String,
//         required: true,
//     },
//     arrivalAirport: {
//         type: String,
//         required: true,
//     },
//     departureDate: {
//         type: Date,
//         required: true,
//     },
//     departureTime: {
//         type: String,
//         required: true,
//     },
//     seatNumber: {
//         type: String,
//     },
//     specialInstructions: {
//         type: String,
//     },
//     TotalAmount: {
//         type: Number,
//     },
//     Quantity: {
//         type: Number,

//     },
//     menuItems: [],
//     paymentStatus: {
//         type: String,
//         enum: ['Pending', 'Completed', 'Failed'],
//         default: 'Pending',
//     },
// }, { timestamps: true });

// export default mongoose.model("Order", orderSchema);
import mongoose from 'mongoose'
const orderSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contactNumber: { type: String, required: true },
    flightNumber: { type: String, required: true },
    airline: { type: String, required: true },
    departureAirport: { type: String, required: true },
    arrivalAirport: { type: String, required: true },
    departureDate: { type: Date, required: true },
    departureTime: { type: String, required: true },
    seatNumber: { type: String },
    Quantity: { type: Number, required: true },
    specialInstructions: { type: String },
    TotalAmount: { type: Number, required: true },
    menuItems: { type: Array, required: true },
    OrderStatus: { type: String, default: "Pending" },
    razorpay_payment_id: { type: String },
    // New field for payment ID
});
export default mongoose.model("Order", orderSchema);
// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;
