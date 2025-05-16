import mongoose from "mongoose";

const connectMongoDB = async() => {
    // Simulate MongoDB connection
    console.log("Connected to MongoDB");
    try {
      await mongoose.connect("mongodb+srv://cupinicode:Guigo4862@cluster0.puhetrj.mongodb.net/myEcommerce?retryWrites=true&w=majority&appName=Cluster0") // Use the connection string from the environment variable
      console.log("MongoDB connected successfully");  
    } catch (error) {
          console.error("Error connecting to MongoDB:", error);
    } 
  }
  
  export default connectMongoDB;