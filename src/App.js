import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

function App() {
  const [isUserLogged, setIsUserLogged] = useState(false);

  return (
    <BrowserRouter>
      <Navbar isUserLogged={isUserLogged} />
      <Routes>
        <Route path="/" element={<div>not implemented</div>} />
        <Route path="/login" element={<Login setIsUserLogged={setIsUserLogged} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
