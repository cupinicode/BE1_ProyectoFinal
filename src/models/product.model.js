import mongoose from "mongoose";    

const productSchhema = new mongoose.Schema({ // Define the product schema
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String,
        required: false,
        trim: true
    },
    category: {
        type: String,
        required: false,
        trim: true
    },
    stock: {
        type: Number,
        required: false,
        min: 0
    },
    status: {
        type: Boolean,
        default: true,
        required: false
    }, 
    createdAt: {
        type: Date,
        default: Date.now()
    },   
}); 

const Product = mongoose.model("Product", productSchhema); // Creamos el modelo Product (siempre se pone con la inicial en mayuscula).  
//Tambien le pasamos al metodo el esquema que tiene que respetar (el que acabamos de crear.)
export default Product; // Export the Product model 