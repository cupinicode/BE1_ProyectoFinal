import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products:{
        type: [
            {
                product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Referencia al modelo de producto.  Esto permite que Mongoose haga una referencia al modelo de producto
                quantity: { type: Number }
            }
        ], 
        default: [] // Por defecto, el carrito estará vacío
    },
    createdAt: {type: Date, default: Date.now }// Fecha de creación del carrito
})

const Cart = mongoose.model('Cart', cartSchema); 
export default Cart; // Exportamos el modelo de carrito