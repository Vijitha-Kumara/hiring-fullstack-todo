import mongoose from "mongoose";
const todoMongoose = new mongoose.Schema(
  {
    title: String,
    description: String,
    done: Boolean,
  },
  { timestamps: true },
);

const Todo = mongoose.model("Todo", todoMongoose);
export default Todo;