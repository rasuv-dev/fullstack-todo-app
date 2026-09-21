import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API_URL from "../api.js";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("email", result.user.email);

      navigate("/");
    } catch (error) {
      alert("Unable to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded shadow p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">Login</h1>

      <p className="text-gray-600 mb-6">
        Log in to manage your tasks.
      </p>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="email"
            className="block font-bold mb-2"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block font-bold mb-2"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="border rounded p-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-gray-600 mt-6">
        Do not have an account?{" "}
        <Link to="/register" className="text-blue-500">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;