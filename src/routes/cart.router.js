import express from "express";
import CartManager from "../CartManager.js";
import Cart from "../models/cart.model.js";

//instanciamos el router de express para manejar las rutas
const cartRouter = express.Router();
//instanciamos el manejador de nuestro archivo de carrito
const cartManager = new CartManager("./src/data/cart.json");

cartRouter.post("/", async(req, res) => {
  try {
    //const carts = await cartManager.addCart(); No lo usamos mas
    const cart = new Cart(); // Creamos una nueva instancia de Cart (vacío)
    await cart.save(); // Guardamos el nuevo carrito en la base de datos
    res.status(201).json({ status: "success", payload: cart }); // Devolvemos el carrito creado
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.get("/:cid", async(req, res) => {
  try {
    //const cartProducts = await cartManager.getCartById(req.params.cid);
    const cid = req.params.cid;
    const cart = await Cart.findById(cid); // Buscamos el carrito por su id y poblamos los productos
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    } 
    res.status(200).json({ status : "success", payload : cart } );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

cartRouter.post("/:cid/product/:pid", async(req, res) => {
  try {
    const { quantity } = req.body;
    const product = { id: parseInt(req.params.pid), quantity };
    const updatedCart = await cartManager.addProductInCartById(req.params.cid, product);
    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default cartRouter;