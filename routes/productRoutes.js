import express from "express";
import multer from "multer";
import productController from "../controller/productController.js";
const upload = multer({ dest: 'uploads/' });

export const productRouter = express.Router();

productRouter.post('/addProduct', productController.addProduct);
productRouter.get('/getProducts/:type', productController.getProducts);
productRouter.put('/updateProduct/:productId', productController.updateProduct);
productRouter.get('/getProduct/:productId', productController.getProduct);
productRouter.delete('/deleteProduct/:productId', productController.deleteProduct);
productRouter.post('/addProductByExcel', upload.single('file'), productController.addProductByExcel);
productRouter.get('/getProductGroups', productController.getProductGroups);
