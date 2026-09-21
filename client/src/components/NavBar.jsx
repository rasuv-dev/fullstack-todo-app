import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Todo App
        </Link>

        <div className="flex items-center gap-4">
          {token ? (
            <>
              <Link to="/" className="hover:underline">
                Tasks
              </Link>

              <Link to="/add" className="hover:underline">
                Add Task
              </Link>

              <span className="text-sm">{email}</span>

              <button
                onClick={logout}
                className="bg-red-500 px-3 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>

              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;