const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI; // Use environment variable for MongoDB URI
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(mongoURI, options)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start your application or perform additional operations
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
