const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;
const { ERROR_NOT_FOUND } = require("./utils/response-status");

const app = express();

const mongoDB = "mongodb://127.0.0.1:27017/mestodb";

mongoose.set("strictQuery", false);
mongoose.connect(mongoDB);

app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: "64455a9adc14c4cc6b9fac63" };
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use("/cards", cardRouter);
app.use("/users", userRouter);

app.use("*", (req, res) => {
  res
    .status(ERROR_NOT_FOUND)
    .send({ message: "Запрашиваемая страница не найдена" });
});

app.listen(PORT, () => {});
