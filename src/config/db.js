import mongoose from "mongoose";

const connectMongoDB = async() => {
    // Simulate MongoDB connection
    console.log("Connected to MongoDB");
    try {
      await mongoose.connect(process.env.URI_MONGODB, { // Use the connection string from the environment variable
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected successfully");  
    } catch (error) {
          console.error("Error connecting to MongoDB:", error);
    } 
  }
  
  export default connectMongoDB;