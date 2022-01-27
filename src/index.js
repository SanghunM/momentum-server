import express from "express";
import chalk from "chalk";
import todoRouter from "./todo/todoRouter.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express(); // server
const PORT = process.env.PORT ?? 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/todo", todoRouter);
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(400).json({
    isError: true,
    data: {
      errMessage: "invalid Request",
    },
  });
  next();
});

mongoose
  .connect(
    "mongodb+srv://test:test@cluster0.wnmw2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(chalk.greenBright("connected DB successfully"));
    app.listen(8000, function () {
      console.log(chalk.red("server is started successfully on 8000"));
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
