import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendors", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    photo: { type: String, required: true }
});

export default mongoose.model("Menus", MenuSchema);
