import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/courses/list/Main";
import Navbar from "./components/Navbar";
import Login from "./components/user/Login";
import Register from "./components/user/Register";

function App() {
  const [isUserLogged, setIsUserLogged] = useState(false);

  return (
    <BrowserRouter>
      <Navbar isUserLogged={isUserLogged} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login setIsUserLogged={setIsUserLogged} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
