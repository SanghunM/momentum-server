import React from "react";
import Todo from "../model/Todo";

type UpdateType = {
  todos: React.Dispatch<React.SetStateAction<Todo[]>>;
  activeKey: React.Dispatch<React.SetStateAction<string>>;
  isAddingmode: React.Dispatch<React.SetStateAction<boolean>>;
};

class TodoPresenter {
  constructor(private todos_: Todo[], private isAddingmode_: boolean = false) {}

  get todos() {
    return this.todos_;
  }

  get isAddingmode() {
    return this.isAddingmode_;
  }

  addHandler = (
    todoupdate: UpdateType["todos"],
    modeupdate: UpdateType["isAddingmode"],
    message?: string
  ) => {
    if (message) {
      this.todos_ = [...this.todos_, new Todo(message)];
      todoupdate(this.todos_);
      modeupdate(!this.isAddingmode);
    }
    this.isAddingmode_ = !this.isAddingmode_;
    modeupdate(this.isAddingmode_);
  };

  deleteHandler = (update: UpdateType["todos"], id: string) => {
    this.todos_ = this.todos_.filter((todo: Todo) => todo.id !== id);
    update(this.todos_);
  };

  updateTodo = (
    update: UpdateType["todos"],
    id: string,
    message: string,
    done?: boolean
  ) => {
    this.todos_ = [...this.todos_];
    const target: Todo | undefined = this.todos_.find(
      (todo: Todo) => todo.id === id
    );

    if (target) {
      if (done) {
        target.done = done;
        target.updated = new Date();
      }
      if (message) {
        target.todoMessage = message;
        target.updated = new Date();
      }
    }
    update(this.todos_);
  };
}

export default TodoPresenter;
