import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AddTaskCard from "../components/AddTaskCard.jsx";

import API_URL, { getAuthHeaders } from "../api.js";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks`, {
          headers: getAuthHeaders(),
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          navigate("/login");
          return;
        }

        const tasks = await response.json();

        const selectedTask = tasks.find(
          (item) => item._id === id
        );

        if (!selectedTask) {
          alert("Task not found");
          navigate("/");
          return;
        }

        setTask(selectedTask);
      } catch (error) {
        alert("Unable to fetch task");
      }
    };

    fetchTask();
  }, [id, navigate]);

  if (!task) {
    return (
      <p className="text-center mt-8">
        Loading task...
      </p>
    );
  }

  return (
    <AddTaskCard
      editMode={true}
      initialData={task}
    />
  );
};

export default EditTask;