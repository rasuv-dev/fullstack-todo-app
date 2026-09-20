import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="p-4 text-white bg-orange-500 flex justify-between items-center">
      <p className="text-xl font-bold flex">MyTodo</p>
      <div className="flex gap-2">
        <Link
          className="inline-flex rounded-xl hover:text-zinc-700 curser-pointer"
          to="/"
        >
          Todo List
        </Link>
        <Link
          className="inline-flex  rounded-xl hover:text-zinc-700 curser-pointer"
          to="/add"
        >
          Add Todo
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
