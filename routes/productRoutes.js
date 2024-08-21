import express from "express";
import productController from "../controller/productController.js";

export const productRouter = express.Router();

productRouter.post('/addProduct', productController.addProduct);
productRouter.get('/getProducts', productController.getProducts);
productRouter.put('/updateProduct/:productID', productController.updateProduct);
productRouter.get('/getProduct/:productID', productController.getProduct);
productRouter.delete('/deleteProduct/:productID', productController.deleteProduct);
