import { Paper, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import CourseDetails from "./components/courses/details/CourseDetails";
import BoughtCourses from "./components/courses/list/BoughtCourses";
import Main from "./components/courses/list/Main";
import ReleasedCourses from "./components/courses/list/ReleasedCourses";
import ContentManager from "./components/courses/manager/content/ContentManager";
import FileManager from "./components/courses/manager/content/FileManager";
import CourseManager from "./components/courses/manager/CourseManager";
import CreateCourse from "./components/courses/manager/CreateCourse";
import CourseFiles from "./components/courses/viewer/CourseFiles";
import CourseViewer from "./components/courses/viewer/CourseViewer";
import Navbar from "./components/navbar/Navbar";
import ChangePassword from "./components/user/ChangePassword";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { theme } from "./theme/theme";

function App() {
  const [isUserLogged, setIsUserLogged] = useState(false);


  const checkIfUserIsLogged = () => {
    var cookie = getCookie("AuthInfo");
    if (cookie !== null) {
      setIsUserLogged(true);
    }
  }

  useEffect(checkIfUserIsLogged, []);

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ minWidth: '100vh', minHeight: '100vh', background: theme => theme.palette.background.default }}>
        <BrowserRouter>
          <Navbar isUserLogged={isUserLogged} setIsUserLogged={setIsUserLogged} />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login setIsUserLogged={setIsUserLogged} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/released" element={<ReleasedCourses />} />
            <Route path="/bought" element={<BoughtCourses />} />
            <Route path="/profile/changepassword" element={<ChangePassword />} />
            <Route path="/courses/:id/details" element={<CourseDetails isUserLogged={isUserLogged} />} />
            <Route path="/courses/:id/view" element={<CourseViewer />} />
            <Route path="/courses/:id/files" element={<CourseFiles />} />
            <Route path="/courses/create" element={<CreateCourse />} />
            <Route path="/courses/:id/edit" element={<CourseManager />} />
            <Route path="/courses/:id/edit/content" element={<ContentManager />} />
            <Route path="/courses/:id/edit/files" element={<FileManager />} />
          </Routes>
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  );
}

function getCookie(cookie) {
  var cookieArr = document.cookie.split(";");
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    if (cookie === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

export default App;
