import Task from "../model/Task.js";

export const createTask = async (title, description, userId) => {
  const task = await Task.create({
    title,
    description,
    userId,
  });

  return task;
};

export const getTasks = async (userId) => {
  const tasks = await Task.find({ userId }).sort({
    createdAt: -1,
  }).lean();

  return tasks;
};

export const updateTask = async (
  id,
  title,
  description,
  userId
) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: id,
      userId,
    },
    {
      title,
      description,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return task;
};

export const deleteTask = async (id, userId) => {
  const task = await Task.findOneAndDelete({
    _id: id,
    userId,
  });

  return task;
};