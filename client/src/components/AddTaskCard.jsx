import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const styles = {
  card: "w-full max-w-md border border-gray-200 shadow-xl rounded-xl p-8 bg-white",
  title: "text-xl font-bold text-center mb-6 text-gray-800",
  form: "flex flex-col gap-4",
  fieldGroup: "flex flex-col gap-1.5",
  label: "text-sm font-medium text-gray-700",
  input:
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400",
  button:
    "mt-2 w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-medium rounded-md shadow-sm transition-colors duration-150",
};



const AddTaskCard = ({ editMode = false, initialData = {} }) => {
  const [taskData, setTaskData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const uri = editMode
      ? `${SERVER_URL}/update-task`
      : `${SERVER_URL}/add-task`;

    const body = editMode ? { ...taskData, id: initialData._id } : taskData;

    try {
      const response = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Something went wrong");
        return;
      }

      alert(editMode ? "Task updated!" : "Task added!");

      // Return to the todo list
      navigate("/");
    } catch (error) {
      alert("Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>
        {editMode ? "Edit Todo" : "Add New Todo"}
      </h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>

          <input
            id="title"
            type="text"
            placeholder="Enter the todo title"
            className={styles.input}
            value={taskData.title}
            onChange={(e) => {
              setTaskData({
                ...taskData,
                title: e.target.value,
              });
            }}
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>

          <textarea
            id="description"
            rows={4}
            placeholder="Enter the todo description"
            className={styles.input}
            value={taskData.description}
            onChange={(e) => {
              setTaskData({
                ...taskData,
                description: e.target.value,
              });
            }}
          />
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Saving..." : editMode ? "Update Todo" : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default AddTaskCard;
