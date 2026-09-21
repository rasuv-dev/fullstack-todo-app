import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TodoItem from "../components/TodoItem.jsx";

import API_URL, { getAuthHeaders } from "../api.js";

const ListTodos = () => {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchTodos = async () => {
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

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      setTodos(result);
    } catch (error) {
      alert("Unable to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!shouldDelete) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`${API_URL}/delete-task`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ id }),
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

      setTodos((previousTodos) =>
        previousTodos.filter((todo) => todo._id !== id)
      );
    } catch (error) {
      alert("Unable to delete task");
    } finally {
      setDeletingId(null);
    }
  };

  const editTodo = (id) => {
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return (
      <p className="text-center mt-8">
        Loading tasks...
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Tasks</h1>

          <p className="text-gray-600 mt-2">
            Manage your personal todo list.
          </p>
        </div>

        <button
          onClick={() => navigate("/add")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      {todos.length === 0 ? (
        <div className="bg-white border rounded p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            No tasks yet
          </h2>

          <p className="text-gray-600">
            Create your first task to get started.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              id={todo._id}
              title={todo.title}
              description={todo.description}
              onDelete={deleteTodo}
              onEdit={editTodo}
              deleting={deletingId === todo._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListTodos;