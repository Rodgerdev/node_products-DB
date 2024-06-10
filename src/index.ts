import express, { Request, Response } from 'express';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

interface Product {
  id: number;
  name: string;
  price: number;
}

let products: Product[] = [];

// Create a product
app.post('/products', (req: Request, res: Response) => {
  const product: Product = req.body;
  console.log(product);
  console.log(req.body);
  
  
  product.id = products.length + 1;
  products.push(product);
  res.status(201).json(product);
});

// Read all products
app.get('/products', (req: Request, res: Response) => {
  res.json(products);
});

//Read a single product
app.get('/products/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).send('Product not found');
  }
  res.json(product);
});

//Update a product
app.put('/products/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).send('Product not found');
  }
  const updatedProduct: Product = { ...products[productIndex], ...req.body };
  products[productIndex] = updatedProduct;
  res.json(updatedProduct);
});

// Deleting
app.delete('/products/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).send('Product not found');
  }
  products.splice(productIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
