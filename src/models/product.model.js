import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, index: "text" }, //Indexa por cualquier palabra que haya en la descripción
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, index: true }, //Indexa por la categoría (una palabra sola, generalmente)
  status: { type: Boolean, default: true },
  thumbnail: { type: String, required: true },
  tags: { Array },
  createdAt: { type: Date, default: Date.now },
});
const Product = mongoose.model('Product', productSchema);

export default Product;