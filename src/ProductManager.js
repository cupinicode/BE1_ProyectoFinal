import fs from 'fs';

class ProductManager{
  constructor(){
    this.path = "./src/data/products.json";
  }

  // Genera un nuevo id basado en el último id existente
  generateId = (products) => {
    if (products.length > 0) {
      // Retorna el último id + 1
      return products[products.length - 1].id + 1;
    } else {
      // Si no hay productos, asigna el id 1
      return 1;
    }
  }


  //getProducts
  // Obtiene todos los productos
  getProducts = async() => {
    try{
      // Lee el archivo .json
      const productsJson = await fs.promises.readFile(this.path, 'utf-8');
      // Convierte el contenido de JSON a un array de productos
      const products = JSON.parse(productsJson);
      // Devuelve el array de productos
      return products
    }catch{
      // Si hay un error, lanza una excepción
      throw new Error(`Error al leer el archivo de productos: ${error.message}`);
    }
  }


  //getProductById
  // Obtiene un producto por su id
  getProductById = async(productId) => {
    try{
      // Lee el archivo .json
      const productsJson = await fs.promises.readFile(this.path, 'utf-8');
      // Convierte el contenido de JSON a un array de productos
      const products = JSON.parse(productsJson);
      // Busca el producto con el id proporcionado
      const product = products.find((productData) => productData.id == productId); // Busca el producto por id en el array
      // Devuelve el producto encontrado
      return product;
    }catch(error){
      // Si hay un error, lanza una excepción
      throw new Error(`Error al obtener el producto: ${error.message}`);
    }
  }


  //addProduct
  // Crea un nuevo producto
  addProduct = async(newProduct) => {
    try{
      // Lee el archivo .json
      const productJson = await fs.promises.readFile(this.path, 'utf-8');
      // Convierte el contenido de JSON a un array de productos
      const products = JSON.parse(productJson);
      // Genera un id único para el nuevo producto
      const id = this.generateId(products);
      // Añade el nuevo producto al array, con el id generado
      products.push({ id, ...newProduct, status: true, thumbnail:"" }); // copia las propiedades del objeto pasado por parámetro
      // Sobreescribe el archivo .json con la lista actualizada
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
      // Devuelve la lista actualizada de productos
      return products[products.length - 1]; // Devuelve el último producto añadido
    }catch(error){
      // Si hay un error, lanza una excepción
      throw new Error(`Error al añadir el producto: ${error.message}`);
    }
  }

  //updateProductById
  // Actualiza los datos de un producto por su id
 setProductById = async(productId, updatedData) => {
    try{
      // Lee el archivo .json
      const productsJson = await fs.promises.readFile(this.path, 'utf-8');
      // Convierte el contenido de JSON a un array de productos
      const products = JSON.parse(productsJson);
      // Busca el índice del producto a actualizar
      const index = products.findIndex(product => product.id == productId);
      // Actualiza el producto con los nuevos datos
      products[index] = { ...products[index], ...updatedData }; // Copia las propiedades del objeto pasado por parámetro
      // Sobreescribe el archivo .json con la lista actualizada
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
      // Devuelve la lista de productos actualizada
      return products;
    }catch(error){  
      // Si hay un error, lanza una excepción
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  }


  //deleteProductById
  // Elimina un producto por su id
  deleteProductById = async(productId) => {
    try{
      // Lee el archivo .json
      const productJson = await fs.promises.readFile(this.path, 'utf-8');
      // Convierte el contenido de JSON a un array de productos
      const products = JSON.parse(productJson);
      // Filtra los productos, eliminando el que tiene el id proporcionado
      const productsFilter = products.filter((productData) => productData.id != productId); // El resto del array queda intacto
      console.log(productsFilter);
      // Sobreescribe el archivo .json con la lista filtrada
      await fs.promises.writeFile(this.path, JSON.stringify(productsFilter, null, 2), 'utf-8');
      // Devuelve la lista filtrada de productos
      return productsFilter;
    }catch(error){  
      // Si hay un error, lanza una excepción
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  }

    deleteProductById2 = async(idProduct) => { //Otra forma de eliminar elementos de un array, usando SPLICE
      try {
        const fileData = await fs.promises.readFile(this.pathFile, 'utf-8');
        const data = JSON.parse(fileData);
        const productIndex = data.findIndex((prod) => prod.id === parseInt(idProduct));
    
        if (productIndex === -1) throw new Error(`Producto con id: ${idProduct} no encontrado`);
        data.splice(productIndex, 1);
    
        await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, 2), 'utf-8');
    
        return data;
      } catch (error) {
        throw new Error(`Error al eliminar el producto: ${error.message}`);
      }
    }
  
}

export default ProductManager;