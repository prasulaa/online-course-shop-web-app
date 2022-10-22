import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";

function App() {
  const [isUserLogged, setIsUserLogged] = useState(false);

  return (
    <BrowserRouter>
      <Navbar isUserLogged={isUserLogged} />
      <Routes>
        <Route path="/" element={<div>not implemented</div>} />
        <Route path="/login" element={<Login setIsUserLogged={setIsUserLogged} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
