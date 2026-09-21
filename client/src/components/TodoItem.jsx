const TodoItem = ({
  id,
  title,
  description,
  onDelete,
  onEdit,
  deleting,
}) => {
  return (
    <div className="bg-white border rounded p-4 shadow">
      <h2 className="text-xl font-bold mb-2">{title}</h2>

      <p className="text-gray-600 mb-4">{description}</p>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(id)}
          className="bg-yellow-500 text-white px-3 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(id)}
          disabled={deleting}
          className="bg-red-500 text-white px-3 py-2 rounded"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;