const app = require("../index");
const connectToDatabase = require("../lib/db");

module.exports = async (req, res) => {
  try {
    await connectToDatabase();
    return app(req, res);
  } catch (error) {
    console.error("MongoDB connection failed:", error);

    return res.status(500).json({
      status: false,
      message: "Database connection failed",
    });
  }
};
