import express from "express";
import TodoContoller from "./todoController.js";

const route = express.Router();
const controller = new TodoContoller();

route.get("/", controller.getTodos);
route.get("/:id", controller.getTodoById);
route.post("/", controller.createTodo);
route.put("/:id", controller.updateTodo);
route.delete("/:id", controller.deleteTodo);

export default route;
