import Todo from "../model/Todo";
const TodoModel = require("../model/Todo");

const todoService = {
  getTodo: function () {
    return TodoModel.find({});
  },

  createTodo: function (todo: Todo) {
    return (todo = new TodoModel({
      ...todo,
    }).save());
  },

  updateTodo: function (id: string, todo: Todo) {
    return (todo = TodoModel.findByIdAndUpdate(
      id,
      {
        content: todo.todoMessage,
      },
      { new: true }
    ));
  },

  deleteTodo: function (id: string) {
    return TodoModel.findByIdAndDelete(id);
  },
};

module.exports = todoService;
