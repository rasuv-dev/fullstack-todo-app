import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./db/dbconfig.js";

import {
  registerUser,
  loginUser,
} from "./services/auth.service.js";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "./services/task.service.js";

import verifyToken from "./middleware/auth.middleware.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

connectDB();

// Root route
app.get("/", (req, res) => {
  res.send("Todo API is running");
});

// Health route
app.get("/health", (req, res) => {
  res.json({
    message: "Server is healthy",
  });
});

// Register
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters",
      });
    }

    const user = await registerUser(email, password);

    res.status(201).json({
      message: "Registration successful",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const result = await loginUser(email, password);

    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
});

// Create task
app.post("/add-task", verifyToken, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const task = await createTask(
      title,
      description,
      req.user.userId
    );

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get current user's tasks
app.get("/tasks", verifyToken, async (req, res) => {
  try {
    const tasks = await getTasks(req.user.userId);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update current user's task
app.post("/update-task", verifyToken, async (req, res) => {
  try {
    const { id, title, description } = req.body;

    if (!id || !title || !description) {
      return res.status(400).json({
        message: "ID, title, and description are required",
      });
    }

    const task = await updateTask(
      id,
      title,
      description,
      req.user.userId
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete current user's task
app.post("/delete-task", verifyToken, async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Task ID is required",
      });
    }

    const task = await deleteTask(id, req.user.userId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});