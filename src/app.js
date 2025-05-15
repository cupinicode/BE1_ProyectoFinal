import express from "express";
import connectMongoDB from "./config/db.js"; // Importamos la conexión que pasamos a un archivo aparte
import productsRouter from "./routes/products.router.js";
import dotenv from "dotenv"; // Import dotenv to load environment variables

// Inicializamos las variables de entorno
dotenv.config(); // Load environment variables from .env file   

const app = express();
const PORT = process.env.PORT || 8080; // Use the port from environment variables or default to 8080

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies


connectMongoDB();

//endpoints

app.use("/api/products", productsRouter); // Use the products router for /api/products endpoint
app.use(express.json()); // Middleware to parse JSON request bodies

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});