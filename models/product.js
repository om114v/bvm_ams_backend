import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        productId: { type: Number, required: true, unique: true },
        productName: { type: String, required: true },
        productCategory: { type: String, required: true },
        specification: { type: String, required: true }
    },
    { timestamps: true }
);

export const productModel = mongoose.model('Product', productSchema);