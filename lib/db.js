const mongoose = require("mongoose");

let cachedConnectionPromise = null;

async function connectToDatabase() {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not configured");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!cachedConnectionPromise) {
    cachedConnectionPromise = mongoose
      .connect(process.env.MONGODB_URL, {
        serverSelectionTimeoutMS: 10000,
      })
      .then((mongooseInstance) => {
        console.log("MongoDB connected successfully");
        return mongooseInstance.connection;
      })
      .catch((error) => {
        cachedConnectionPromise = null;
        throw error;
      });
  }

  return cachedConnectionPromise;
}

module.exports = connectToDatabase;
