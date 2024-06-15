import express from 'express';
import { addProduct, getProducts, updateProduct, deleteProduct } from '../Controllers/productController';
import { verifyToken } from '../Middlewares';

const router = express.Router();

router.post('', verifyToken, addProduct);
router.get('', verifyToken, getProducts);
router.put('/product', verifyToken, updateProduct);
router.delete('/product/:Id', verifyToken, deleteProduct);

export default router;
