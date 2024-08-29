import express from "express";
import productController from "../controller/productController.js";

export const productRouter = express.Router();

productRouter.post('/addProduct', productController.addProduct);
productRouter.get('/getProducts', productController.getProducts);
productRouter.put('/updateProduct/:productId', productController.updateProduct);
productRouter.get('/getProduct/:productId', productController.getProduct);
productRouter.delete('/deleteProduct/:productId', productController.deleteProduct);
