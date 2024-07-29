import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import User from "./pages/users";
import Pokes from "./pages/pokes";
import Register from "./pages/register";
import Search from "./pages/search";

function App() {
  return (
    <div>
      <div className="min-h-screen p-6 bg-white text-gray-600 text-lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokes" element={<Pokes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-item/:id" element={<User />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
