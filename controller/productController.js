import mongoose from 'mongoose';
import { productModel } from '../models/product.js';

class productController {
    static createProduct = async (req, res) => {
        try {
            const product = new productModel(req.body);
            await product.save();
            res.status(201).json({ message: 'Product created successfully', product });
        } catch (error) {
            res.status(400).json({ message: 'Error creating product', error });
        }
    };

    static getAllProducts = async (req, res) => {
        try {
            const products = await productModel.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    };
    static getProductCategory = async (req, res) => {
        try {
            const products = await productModel.find({ productCategory: req.params.category });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    };

    static getProductById = async (req, res) => {
        try {
            const product = await productModel.findById(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error });
        }
    };
    static updateProduct = async (req, res) => {
        try {
            const product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json({ message: 'Product updated successfully', product });
        } catch (error) {
            res.status(400).json({ message: 'Error updating product', error });
        }
    };
    static deleteProduct = async (req, res) => {
        try {
            const id = req.params.id;
            const product = await productModel.findByIdAndDelete(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ message: 'Error deleting product', error });
        }
    };
}

export default productController;