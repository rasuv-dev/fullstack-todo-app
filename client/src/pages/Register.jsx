import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API_URL from "../api.js";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/register`, {
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

      alert("Registration successful. Please log in.");
      navigate("/login");
    } catch (error) {
      alert("Unable to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded shadow p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">
        Create Account
      </h1>

      <p className="text-gray-600 mb-6">
        Register to create your personal todo list.
      </p>

      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4"
      >
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
            placeholder="At least 6 characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength="6"
            required
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block font-bold mb-2"
          >
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            minLength="6"
            required
            className="border rounded p-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="text-center text-gray-600 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Log in here
        </Link>
      </p>
    </div>
  );
};

export default Register;