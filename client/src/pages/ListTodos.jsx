import React, { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import { useNavigate } from "react-router-dom";
const styles = {
  title: "flex justify-center w-full p-4 text-xl font-bold",
  todos: "flex flex-col gap-4",
};

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const ListTodos = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const editTodo = (id) => {
    navigate(`/edit/${id}`);
  };
  const fetchTasks = async () => {
    try {
      const uri = `${SERVER_URL}/tasks`;
      const response = await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setTasks(result);
    } catch (error) {
      alert("Error fetching tasks:" + error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const [deletingId, setDeletingId] = useState(null);

  const deleteTodo = async (id) => {
    if (deletingId) {
      alert("Already deleting a task...");
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`${SERVER_URL}/delete-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      } else {
        alert("Failed to delete task: " + result.message);
      }
    } catch (error) {
      alert("Failed to delete the todo");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className={styles.title}>To do list</h1>
      <ul className={styles.todos}>
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id}>
              <TodoItem
                id={task._id}
                title={task.title}
                description={task.description}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}
      </ul>
    </div>
  );
};

export default ListTodos;
