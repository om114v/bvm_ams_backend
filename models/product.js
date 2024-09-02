import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        productId: { type: Number, required: true, unique: true },
        // orderId: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' }],
        productName: { type: String, required: true },
        productCategory: { type: String, required: true },
        specification: { type: String, required: true },
        location: { type: String, required: true },
    },
    { timestamps: true }
);

export const productModel = mongoose.model('Product', productSchema);