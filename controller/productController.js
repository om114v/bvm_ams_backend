import mongoose from 'mongoose';
import { productModel } from '../models/product.js';

class productController {
    static addProduct = async (req, res) => {
        const session = await mongoose.startSession();
        const { productID, productName, productCategory, specification } = req.body;
        try {
            session.startTransaction();
            const product = await productModel.findOne({ _id: productID });
            if (product) {
                return res.error(400, "Product ID already exists..!!!", null);
            }
            if (productID && productName && productCategory && specification) {
                const newProduct = new productModel({
                    productID,
                    productName,
                    productCategory,
                    specification,
                });
                const savedProduct = await newProduct.save({ session });
                await session.commitTransaction();
                return res.success(201, "New product added successfully.", savedProduct);
            } else {
                return res.error(400, "Please fill all the required details...!", null);
            }
        } catch (error) {
            await session.abortTransaction();
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    };

    static getProducts = async (req, res) => {
        try {
            const products = await productModel.find();
            return res.success(200, "All products found successfully.", products);
        } catch (error) {
            console.log("Error fetching products: " + error);
            return res.error(400, error, null);
        }
    }

    static getProduct = async (req, res) => {
        const productID = req.params.productID;
        try {
            const product = await productModel.findOne({ _id: productID });
            if (!product) {
                return res.error(404, "Product not found for this ID.", null);
            }
            return res.success(200, "Product found successfully.", product);
        } catch (error) {
            console.log("Error fetching product: " + error);
            return res.error(400, error, null);
        }
    }

    static updateProduct = async (req, res) => {
        const session = await mongoose.startSession();
        const productID = req.params.productID;
        const { productName, productCategory, specification } = req.body;
        try {
            session.startTransaction();
            const product = await productModel.findOne({ _id: productID });
            if (!product) {
                return res.error(404, "Product not found for this ID.", null);
            }
            if (productName && productCategory && specification) {
                const updatedProduct = await productModel.updateOne(
                    { _id: productID },
                    {
                        $set: {
                            productName,
                            productCategory,
                            specification,
                        },
                    },
                    { session }
                );
                await session.commitTransaction();
                return res.success(200, "Product updated successfully.", updatedProduct);
            } else {
                return res.error(400, "Please fill all the required details...!", null);
            }
        } catch (error) {
            await session.abortTransaction();
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    };

    static deleteProduct = async (req, res) => {
        const session = await mongoose.startSession();
        const productID = req.params.productID;
        try {
            session.startTransaction();
            const product = await productModel.findOne({ _id: productID });
            if (!product) {
                return res.error(404, "Product not found for this ID.", null);
            }
            const deletion = await productModel.deleteOne({ _id: productID }, { session });
            await session.commitTransaction();
            return res.success(200, "Product deleted successfully.", deletion);
        } catch (error) {
            await session.abortTransaction();
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    }
}

export default productController;
