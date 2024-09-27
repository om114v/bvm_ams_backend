import express from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controller/productController.js';

const router = express.Router();

router.post('/addproducts', createProduct);
router.get('/getproducts', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
