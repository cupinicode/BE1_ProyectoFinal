import express from 'express';
// import Product from '../models/product.model.js';  // importamos el modelo Product.  NO HACE FALTA, porque ahora lo manejamos en los controladores
import { getAllProducts, createProduct, updateProduct, getrProductById, deleteProduct } from '../controllers/products.controller.js'; // Importamos los controladores

const productsRouter = express.Router();

productsRouter.get('/', getAllProducts);

productsRouter.post('/', createProduct); // Agregar un producto

productsRouter.put('/:pid', updateProduct); // Modificar un producto

productsRouter.get('/:pid', getrProductById); // Traer sólo un producto

productsRouter.delete('/:pid', deleteProduct)                     

export default productsRouter;