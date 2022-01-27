import mongoose from "mongoose";

const Schema = mongoose.Schema;
const todoSchema = new Schema({
  message: {
    type: String,
    unique: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: new Date(),
  },
  updated: {
    type: Date,
    default: new Date(),
  },
});

const TodoModel = mongoose.model("todos", todoSchema);

export default TodoModel;
