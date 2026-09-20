import Task from "../model/Task.js";

const createTask = async (title, description) => {
  const task = await Task.create({
    title,
    description,
  });

  return task;
};

const getTasks = async () => {
  const tasks = await Task.find({}).lean();
  return tasks;
};

const deleleTask = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  return task;
};

const editTask = async (id, title, description) => {
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    {
      title,
      description,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedTask;
};

export { createTask, getTasks, deleleTask ,editTask};
