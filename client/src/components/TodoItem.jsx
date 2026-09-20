const styles = {
  card: "w-full p-4 shadow-md border border-gray-200 rounded-xl flex items-center justify-between gap-4",
  title: "text-xl text-gray-900 font-medium",
  description: "text-base text-zinc-600",
  delete:
    "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium rounded-lg px-3 py-1.5 transition-colors shrink-0",
  edit: "bg-lime-600 hover:bg-lime-700 active:bg-lime-800 text-white font-medium rounded-lg px-3 py-1.5 transition-colors shrink-0",
};

function TodoItem({ id, title, description, onDelete, onEdit }) {
  return (
    <article className={styles.card}>
      <div className="flex-1 min-w-0">
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <button className={styles.edit} onClick={() => onEdit?.(id)}>
        Edit
      </button>
      <button className={styles.delete} onClick={() => onDelete?.(id)}>
        Delete
      </button>
    </article>
  );
}

export default TodoItem;
