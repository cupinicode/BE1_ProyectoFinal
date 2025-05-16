
//conectamos websockets del lado del cliente
const socket = io();

const formNewProduct = document.getElementById("formNewProduct");

formNewProduct.addEventListener("submit", (event)=> {
  event.preventDefault(); //Evitamos el recargado de la página

  const formData = new FormData(formNewProduct); // La clase FormData permite crear un objeto que representa los datos de un formulario HTML
  //extrae todos los datos del formulario y los convierte en un array.  FormData es una API que  
  // viene por defecto en nodejs.  Le paso el nombre del formlario por parámetro
  const productData = {}; //Objeto vacío, que rellenaremos con los datos del formulario

  formData.forEach((value, key)=> {
    productData[key] = value; //Creamos cada propiedad del objeto productData con el nombre del campo del formulario y su valor
  });

  //enviamos los datos del producto al servidor
  socket.emit("newProduct", productData);
})

socket.on("productAdded", (newProduct)=> {
  const productsList = document.getElementById("productsList"); //Capturo el contenedor de la lista de productos

  productsList.innerHTML += `<li> ${newProduct.title} - ${newProduct.price} </li>`; //Agrego el nuevo producto a la lista de productos
});

