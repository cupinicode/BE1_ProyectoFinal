import express from "express";
import ProductManager from "../ProductManager.js";
import Product from "../models/product.model.js"; // Reemplaza a la antigua clase ProductManager

//instanciamos el router de express para manejar las rutas
const productsRouter = express.Router();
//instanciamos el manejador de nuestro archivo de productos
const productManager = new ProductManager("./src/data/products.json");

productsRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // Buscamos todos los productos en la base de datos
    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

productsRouter.get("/:pid", async (req, res) => {
  try {
    const products = await productManager.getProductById(req.params.pid);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    //const product = await productManager.addProduct(newProduct); NO LO USO MAS
    const product = new Product(newProduct);
    await product.save(); // Guardamos el nuevo producto en la base de datos
    res.status(201).json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const updatedProduct = req.body;
    const products = await productManager.setProductById(req.params.pid, updatedProduct);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    await productManager.deleteProductById(req.params.pid);
    res.status(200).json({ message: `Producto con id: ${req.params.pid} eliminado` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default productsRouter;