require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const noteRoute = require("./routes/notes.routes");
const userRoute = require("./routes/user.routes");
const todoRoute = require("./routes/todo.routes");

const cors = require("cors");

const port = process.env.PORT;
const isProduction = process.env.NODE_ENV === "production";
const configuredOrigins = [
  process.env.FRONTEND_URL,
  ...(process.env.FRONTEND_URL|| "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
];
const allowedOrigins = [
  ...configuredOrigins,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];

console.log("Allowed Origins:", allowedOrigins);
const localDevOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/;

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => console.log(err));

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Incoming Origin:", origin);

    // allow requests without origin (like Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    status: true,
    message: "Notes app backend is running",
  });
});

app.use("/notes", noteRoute);
app.use("/user", userRoute);
app.use("/todo", todoRoute);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
