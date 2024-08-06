import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

    acity: { type: String, required: true },
    oaddress: { type: String, required: true },
    ophoto: { type: String, required: true },
    role: { type: String, default: 'partner' },
    status: { type: String, default: 'Unverified' }
});

export default mongoose.model("Vendors", VendorSchema);
