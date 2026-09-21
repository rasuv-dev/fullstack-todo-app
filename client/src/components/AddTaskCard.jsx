import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API_URL, { getAuthHeaders } from "../api.js";

const AddTaskCard = ({
  editMode = false,
  initialData = {},
}) => {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTask((previousTask) => ({
      ...previousTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const url = editMode
      ? `${API_URL}/update-task`
      : `${API_URL}/add-task`;

    const requestBody = editMode
      ? {
          id: initialData._id,
          title: task.title,
          description: task.description,
        }
      : {
          title: task.title,
          description: task.description,
        };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        alert(result.message);
        return;
      }

      alert(
        editMode
          ? "Task updated successfully"
          : "Task added successfully"
      );

      navigate("/");
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded shadow p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {editMode ? "Edit Task" : "Add New Task"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="title"
            className="block font-bold mb-2"
          >
            Title
          </label>

          <input
            id="title"
            type="text"
            name="title"
            placeholder="Enter task title"
            value={task.title}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block font-bold mb-2"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            placeholder="Enter task description"
            value={task.description}
            onChange={handleChange}
            rows="5"
            required
            className="border rounded p-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading
            ? "Saving..."
            : editMode
            ? "Update Task"
            : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTaskCard;