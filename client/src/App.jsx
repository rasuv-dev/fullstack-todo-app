import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddTask from "./pages/AddTask";
import ListTodos from "./pages/ListTodos";
import EditTask from "./pages/EditTask";

export const App = () => {
  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ListTodos />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
