import Todo from "../model/Todo";
import { Request, Response, NextFunction } from "express";
const TodoService = require("./todoService");

const todoController = {
  getTodo: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await TodoService.getTodo();
      res.json({
        isError: false,
        data: { todos },
      });
    } catch (err) {
      next(err);
    }
  },

  createTodo: async function (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body) {
        throw new Error("no");
      }
      const todo = await new TodoService.createTodo(req.body);
      res.status(201).json({
        isError: false,
        data: {
          todo,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  updateTodo: async function (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body) {
        console.log("no body");
        throw new Error("no content");
      }
      if (!req.params.id) {
        throw new Error("no id");
      }

      const todo = await TodoService.updateTodo(req.params.id, req.body);

      if (!todo) {
        throw new Error("invalid");
      }

      res.json({
        isError: false,
        data: {
          todo,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  deleteTodo: async function (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("no id");
      }
      const todo = await TodoService.deleteTodo(req.params.id);
      res.json({
        isError: false,
        data: {
          todo: todo,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = todoController;
