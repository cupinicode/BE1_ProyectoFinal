// En este archivo va la LOGICA DE NEGOCIOS (conexión con la base de datos)

import Product from "../models/product.model.js";

const getAllProducts = async(req, res) => {
    try {
      const products = await Product.find(); // Find all products in the database
      res.status(200).json({ status: "success", payload: products }); // Send the products as a JSON response
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal server error' }); // Send an error response
    } 
  }

const createProduct = async(req, res) => {
    try {
      const { title, description, price, imageUrl, category, stock } = req.body; // Destructure the request body
      const newProduct = new Product({ title, description, price, imageUrl, category, stock }); // Creamos una nueva instancia del modelo Product con los datos recibidos
      await newProduct.save(); // grabamos el producto y lo guardamos en la base de datos
      res.status(201).json({ status: "success", payload: newProduct }); // Send the created product as a JSON response
    } catch (error) {
      res.status(500).json({ message: 'Error al crear un producto' }); // Send an error response
    }
  }

  const updateProduct = async(req, res) => {
    try {
      const { pid } = req.params; // Get the product ID from the request parameters
      const updateData = req.body; 
      const updatedProduct = await Product.findByIdAndUpdate(pid, updateData, { new: true, runValidators: true }); // Actualiza el producto. El objeto de opciones { new: true } devuelve el documento actualizado
      // Si no lo pongo, me devuelve el documento original antes de la actualización. runValidators: true valida el documento antes de actualizarlo (con el SCHEMA)
      if (!updatedProduct) { // Si no encontró el producto con el findByIdAndUpdate, me devuelve null.
        return res.status(404).json({ message: 'Producto no encontrado' }); // Send a 404 response if the product is not found
      }
      res.status(200).json({ status: "success", payload: updatedProduct }); // Send the updated product as a JSON response
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto' }); // Send an error response
    }
  }

const getrProductById = async(req, res) => {
    try {
      const { pid } = req.params; // Traer sólo un producto
      const product = await Product.findById(pid); // Busca por PID
      if (!product) { // Si no encontró el producto con el findById, me devuelve null.
        return res.status(404).json({ message: 'Producto no encontrado' }); // Send a 404 response if the product is not found
      }
      res.status(200).json({ status: "success", payload: product }); // Lo encontró, así que me lo devuelve en un JSON
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el producto' }); // Send an error response
    }
  }

  const deleteProduct = async(req, res) => {
    try {
      const { pid } = req.params; 
      const deletedProduct = await Product.findByIdAndDelete(pid); // Buscar y borrar el producto por su ID
      if (!deletedProduct) { // Si no encontró el producto con el findByIdAndDelete, me devuelve null.
        return res.status(404).json({ message: 'Producto no encontrado' }); // Send a 404 response if the product is not found
      }
      res.status(200).json({ status: "success", payload: deletedProduct }); // Send the deleted product as a JSON response
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto' }); // Send an error response
    }
  }

  export { getAllProducts, createProduct, updateProduct, getrProductById, deleteProduct};