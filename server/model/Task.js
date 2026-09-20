import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
  title: String,
  description: String,
});

const Task = mongoose.model("Task",TaskSchema);

export default Task;
