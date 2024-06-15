import express from 'express';
import categoryRoutes from './Routes/categoryRoutes';
import productRoutes from './Routes/productRoutes';
import authRoutes from './Routes/authRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/register', authRoutes);
app.use('/category', categoryRoutes);
app.use('/categories', categoryRoutes);
app.use('/product', productRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
