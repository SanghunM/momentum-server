import { Express } from "express";

const express = require("express"); // for an entire server
const todoController = require("./todoController");
const route = express.Router();

// C: post R: get U : put or petch D: delete

route.get("/", todoController.getTodo);
// create new object
route.post("/", todoController.createTodo);
route.put("/:id", todoController.updateTodo);
route.delete("/:id", todoController.deleteTodo);

module.exports = route;
