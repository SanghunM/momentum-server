import TodoService from "./todoService.js";

class TodoContoller {
  constructor() {
    this.service = new TodoService();
    this.getTodos = this.getTodos.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.getTodoById = this.getTodoById.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  async getTodos(req, res, next) {
    try {
      const todos = await this.service.getTodos();
      res.status(200).json({ todos });
    } catch (err) {
      next(err);
    }
  }

  async getTodoById(req, res, next) {
    try {
      const id = req.params.id;
      const todo = await this.service.getTodoById(id);
      res.status(200).json({ todo });
    } catch (err) {
      next(err);
    }
  }

  async createTodo(req, res, next) {
    try {
      const newTodo = req.body.content;
      console.log(req.body);
      const todo = await this.service.createTodo(newTodo);
      res.status(201).json({ todo });
    } catch (err) {
      next(err);
    }
  }

  async updateTodo(req, res, next) {
    try {
      console.log("body", req.body);
      const id = req.params.id;
      const todo = await this.service.updateTodo(
        id,
        req.body.content,
        (req.body.done = false)
      );
      res.status(200).json({ todo });
    } catch (err) {
      next(err);
    }
  }

  async deleteTodo(req, res, next) {
    try {
      const id = req.params.id;
      const todo = await this.service.deleteTodo(id);
      res.status(200).json({ todo });
    } catch (err) {
      next(err);
    }
  }
}

export default TodoContoller;
