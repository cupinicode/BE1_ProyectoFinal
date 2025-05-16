import fs from "fs";

class CartManager{
  constructor(){
    this.path = './src/carts.json';
  }

  generateNewId = (carts) => { //Genera un nuevo id basado en el último id existente
    // Si hay carritos, retorna el último id + 1
    // Si no hay carritos, asigna el id 1
    if(carts.length > 0){
      return carts[carts.length - 1].id + 1;
    }else{
      return 1;
    }
  }

  //addCart - Agrega un carrito vacío
  addCart = async() => {
    const cartsJson = await fs.promises.readFile(this.path, 'utf-8');
    const carts = JSON.parse(cartsJson);

    const id = this.generateNewId(carts);
    carts.push({ id , products: [] });

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8' );
    return carts;
  }

  //getProductsInCartById - Devuelve los productos de un carrito por su id
  getProductsInCartById = async(cid) => {
    const cartsJson = await fs.promises.readFile(this.path, 'utf-8');
    const carts = JSON.parse(cartsJson);

    const cart = carts.find((cartData)=> cartData.id == cid ); // Busca el carrito con el id pasado por parámetro
    return cart.products;
  }
  
  //addProductInCart
  addProductInCart = async(cid, pid, quantity) => { // Agrega un IDproducto al IDcarrito indicado, con cantidad en body
    const cartsJson = await fs.promises.readFile(this.path, 'utf-8');
    const carts = JSON.parse(cartsJson);

    carts.forEach(cart => {
      if(cart.id == cid){ // Si el carrito coincide con el id pasado por parámetro
          const product = cart.products.find((productData)=> productData.id == pid ); // Busca el producto en el carrito
          if (!product) { // Si el producto no existe en el carrito, lo pushea
            cart.products.push({ id : pid , quantity })
          }else{ // Si el producto ya existe, actualiza la cantidad
            product.quantity += quantity;
          }
        }
      }
    );

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');

    return carts;
  }
};

export default CartManager;