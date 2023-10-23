import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import redrockFetch from "../fetch.js";

export default function Login({ setUser, setToken }) {
  const nameInput = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const setMessage = (msg) => {
    setTimeout(() => {
      setError(null);
    }, 2_000);
    setError(msg);
  };

  const onLogin = async () => {
    if (username.length < 3 && password.length < 3)
      return setMessage("Both fields required");
    if (username.length < 4) return setMessage("Username should be longer");
    if (password.length < 4) return setMessage("Password should be longer");
    else {
      const { user, token, exp, msg } = await redrockFetch(
        "/api/auth/verify-auth",
        "post",
        {
          username,
          password,
        }
      );
      if (user && token) {
        setToken(token);
        setUser(user);
        localStorage.setItem("redrock_auth", JSON.stringify({ token, user }));
        return navigate("/dashboard");
      } else {
        setMessage(msg);
        return nameInput.current.focus();
      }
    }
  };

  return (
    <div
      style={{
        borderRadius: "20px",
        padding: "20px",
        height: "100%",
        width: "100%",
        maxWidth: "600px",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "425px", width: "100%" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            marginBottom: "50px",
          }}
        >
          Login
        </h1>
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          {error ? error : "\u00A0"}
        </h3>
        <div className="mb-3">
          <input
            className="form-control form-control-lg text-center"
            ref={nameInput}
            autoFocus
            type="text"
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
            autoCapitalize="off"
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control form-control-lg text-center"
            tabIndex="0"
            type="password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            autoCapitalize="off"
            onKeyUp={({ key }) => {
              if (key === "Enter") onLogin();
            }}
          />
        </div>
        <button
          className="btn btn-primary btn-lg mb-3"
          style={{ width: "100%" }}
          onClick={onLogin}
        >
          Login
        </button>
        <Link to="/" className="btn btn-primary btn-lg w-100 mb-3">
          Back to home
        </Link>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 style={{ margin: 0 }}>No account?</h3>
          <Link to="/register" className="btn btn-warning btn-lg w-50">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
