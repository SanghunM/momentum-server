import Todo from "./Todo.js";

import TodoModel from "./todoModel.js";

export const mockData = [new Todo("study react"), new Todo("study JS")];

class TodoService {
  constructor() {}

  async getTodos() {
    const data = await TodoModel.find();
    return data;
  }
  async getTodoById(id) {
    const data = await TodoModel.findById(id);
    return data;
  }

  createTodo(todo) {
    return TodoModel.create({ message: todo });
  }

  async updateTodo(id, body, done) {
    return await TodoModel.findOneAndUpdate(
      { _id: id },
      { message: body, done: done }
    );
  }

  async deleteTodo(id) {
    const deletedItem = await TodoModel.findById(id);
    await TodoModel.deleteOne({ _id: id });
    return deletedItem;
  }
}

export default TodoService;
