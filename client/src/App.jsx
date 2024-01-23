import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ReactDOM from "react-dom/client";
import { useState, Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Skills from "./pages/Skills.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PrivateRoute from "./pages/Protected/PrivateRoute.jsx";
import Dashboard from "./pages/Protected/Dashboard.jsx";
import TaskManager from "./pages/Protected/TaskManager.jsx";
import Grades from "./pages/Protected/Grades.jsx";
import SendEmail from "./pages/Protected/SendEmail.jsx";
import NewUpdate from "./pages/Protected/NewUpdate";
import ChatManager from "./pages/Protected/Chat/ChatManager";
import UserLayout from "./pages/Protected/UserManager/Layout";
import Python from "./pages/Protected/Python";
import redrockFetch from "./fetch";
import config from "./app_config.js";
import ImageCompressor from "./pages/Protected/ImageCompressor";
import ScheduleEmail from "./pages/Protected/ScheduleEmail";
import PasswordGen from "./pages/Protected/PasswordGen";
import ServerManager from "./pages/ServerManager";
import Resume from "./pages/Resume/Resume.jsx";

const Weather = lazy(() => import("./pages/Weather.jsx"));

const App = () => {
  const cookie = JSON.parse(localStorage.getItem("redrock_auth"));

  const [token, setToken] = useState(cookie?.token);
  const [user, setUser] = useState(cookie?.user);
  const [alert, setAlert] = useState(null);

  const checkNewMessages = async () => {
    if (user && token) {
      const count = await redrockFetch(
        "/api/admin/checkNewMessages",
        "get",
        null,
        token
      );
      count !== 0
        ? setAlert(`You have ${count} new message(s)`)
        : setAlert(null);
    }
  };

  const signout = () => {
    localStorage.removeItem("redrock_auth");
    localStorage.removeItem("redrock_selectedUser");
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    if (user) {
      const intervalId = setInterval(() => {
        checkNewMessages();
      }, config.newMessageCheckInterval);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout alert={alert} />}>
          <Route index element={<Home />} />
          <Route path="about" index element={<About />} />
          <Route path="skills" index element={<Skills />} />
          <Route path="resume" index element={<Resume />} />
          <Route
            path="weather"
            index
            element={
              <Suspense
                fallback={
                  <div
                    style={{
                      marginTop: "40px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <h1 style={{ marginBottom: "50px" }}>Loading weather</h1>
                    <Spinner animation="border" variant="primary" />
                  </div>
                }
              >
                <Weather />
              </Suspense>
            }
          />
          <Route
            path="login"
            element={<Login setUser={setUser} setToken={setToken} />}
          />
          <Route path="register" element={<Register setUser={setUser} />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={user}>
                <Dashboard user={user} token={token} signout={signout} />
              </PrivateRoute>
            }
          />
          <Route
            path="/task-manager"
            element={
              <PrivateRoute user={user}>
                <TaskManager user={user} token={token} />
              </PrivateRoute>
            }
          />
          <Route
            path="/send-email"
            element={
              <PrivateRoute user={user}>
                <SendEmail user={user} token={token} />
              </PrivateRoute>
            }
          />
          <Route
            path="/grades"
            element={
              <PrivateRoute user={user}>
                <Grades user={user} token={token} />
              </PrivateRoute>
            }
          />
          <Route
            path="/line-count"
            element={
              <PrivateRoute user={user}>
                <Python user={user} token={token} />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-update"
            element={
              <PrivateRoute user={user}>
                <NewUpdate user={user} token={token} />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-users"
            element={
              <PrivateRoute user={user}>
                <UserLayout user={user} token={token} />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute user={user}>
                <ChatManager user={user} token={token} />
              </PrivateRoute>
            }
          />
          <Route
            path="/image-compressor"
            element={
              <PrivateRoute user={user}>
                <ImageCompressor user={user} token={token} />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule-email"
            element={
              <PrivateRoute user={user}>
                <ScheduleEmail user={user} token={token} />
              </PrivateRoute>
            }
          />
          <Route
            path="/password-generator"
            element={
              <PrivateRoute user={user}>
                <PasswordGen user={user} token={token} />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-server"
            element={
              <PrivateRoute user={user}>
                <ServerManager user={user} token={token} />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
