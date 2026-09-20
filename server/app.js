import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./db/dbconfig.js";
import {
  createTask,
  deleleTask,
  getTasks,
  editTask,
} from "./services/task.service.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

connectDB();

app.post("/add-task", async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await createTask(title, description);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      success: "failure",
      message: `error : ${error}`,
    });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await getTasks();
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({
      success: "failure",
      message: `${e}`,
    });
  }
});

app.post("/delete-task", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      success: "failure",
      message: "Task ID is required",
    });
  }

  try {
    const task = await deleleTask(id);

    if (!task) {
      return res.status(404).json({
        success: "failure",
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: "deleted",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: "failure",
      message: error.message,
    });
  }
});

app.post("/update-task", async (req, res) => {
  const { id, title, description } = req.body;

  if (!id || !title) {
    return res.status(400).json({
      success: "failure",
      message: "ID and title are required",
    });
  }

  try {
    const task = await editTask(id, title, description);

    if (!task) {
      return res.status(404).json({
        success: "failure",
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      success: "failure",
      message: error.message,
    });
  }
});
app.get("/health", (req, res) => {
  res.send("server is running on port:"+process.env.PORT);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});