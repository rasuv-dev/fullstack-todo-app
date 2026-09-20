import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddTaskCard from "../components/AddTaskCard";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;;

const EditTask = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/tasks`);

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const tasks = await response.json();

        const foundTask = tasks.find((task) => task._id === id);

        if (!foundTask) {
          alert("Task not found");
          navigate("/");
          return;
        }

        setTask(foundTask);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  if (loading) {
    return <p className="text-center mt-10">Loading task...</p>;
  }

  if (!task) {
    return null;
  }

  return (
    <div className="h-screen w-full flex justify-center items-center bg-lime-50">
      <AddTaskCard editMode={true} initialData={task} />
    </div>
  );
};

export default EditTask;
