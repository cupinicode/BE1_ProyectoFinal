import express from "express";
import ProductManager from "../ProductManager.js";

const viewsRouter = express.Router();
const productManager = new ProductManager("./src/data/products.json");

viewsRouter.get("/", async(req, res)=> {
  try{
    const products = await productManager.getProducts();
    res.render("home", { products }); //renderizo la plantilla de home.handlebars 
  }catch(error){
    res.status(500).send({ message: error.message });
  }
});

viewsRouter.get("/realtimeproducts", async(req, res)=> {
  try{
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products }); // Renderizo la plantilla de realtimeproducts.handlebars
  }catch(error){
    res.status(500).send({ message: error.message });
  }
});

export default viewsRouter;