require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const noteRoute = require("./routes/notes.routes");
const userRoute = require("./routes/user.routes")
const todoRoute = require("./routes/todo.routes")

const cors = require("cors")

const app = express();

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    "Mongodb connected succesfully";
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/notes", noteRoute);
app.use("/user", userRoute);
app.use("/todo", todoRoute);

app.listen(port, () => {
  console.log(`Sever runninng on the port ${port}`);
});
