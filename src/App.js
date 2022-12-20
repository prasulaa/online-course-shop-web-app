import { Paper, ThemeProvider } from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";
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
import { lightTheme, darkTheme } from "./theme/theme";

function App() {
  const [state, setState] = useState({
    isUserLogged: false,
    darkMode: true
  });


  const checkIfUserIsLogged = () => {
    var cookie = getCookie("AuthInfo");
    if (cookie !== null) {
      setState((prevState) => ({
        ...prevState,
        isUserLogged: true
      }))
    }
  }

  const setIsUserLogged = (logged) => {
    setState((prevState) => ({
      ...prevState,
      isUserLogged: logged
    }))
  }

  const setDarkMode = (darkMode) => {
    setState((prevState) => ({
      ...prevState,
      darkMode: darkMode
    }))
  }

  useEffect(checkIfUserIsLogged, []);

  return (
    <ThemeProvider theme={state.darkMode ? darkTheme : lightTheme}>
      <Paper sx={{ minWidth: '100vw', minHeight: '100vh', background: theme => theme.palette.background.default }}>
        <BrowserRouter>
          <Navbar 
            isUserLogged={state.isUserLogged} 
            setIsUserLogged={setIsUserLogged} 
            isDarkMode={state.darkMode}
            setDarkMode={setDarkMode}
          />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login setIsUserLogged={setIsUserLogged} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/released" element={<ReleasedCourses />} />
            <Route path="/bought" element={<BoughtCourses />} />
            <Route path="/profile/changepassword" element={<ChangePassword />} />
            <Route path="/courses/:id/details" element={<CourseDetails isUserLogged={state.isUserLogged} />} />
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
