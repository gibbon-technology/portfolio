import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ setUser }) {
  const nameInput = useRef();
  // const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const setMessage = (msg) => {
    setTimeout(() => {
      setError(null);
    }, 2_000);
    setError(msg);
  };

  // const onRegister = async () => {
  //   if (username.length < 3 && password.length < 3)
  //     return setMessage("Both fields required");
  //   if (username.length < 4) return setMessage("Username should be longer");
  //   if (password.length < 4) return setMessage("Password should be longer");
  //   else {
  //     const { user, msg } = await redrockFetch(
  //       "/api/auth/register-auth",
  //       "post",
  //       { username, password }
  //     );
  //     if (!user) {
  //       setMessage(msg);
  //       nameInput.current.focus();
  //       return setUsername("");
  //     }
  //     if (user) {
  //       setUser(user);
  //       localStorage.setItem("redrock_auth", JSON.stringify({ user }));
  //       return navigate("/dashboard");
  //     }
  //   }
  // };

  const checkUsername = async () => {
    if (username.length > 0) {
      const usernameCheck = await fetch("/api/auth/check-username", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username }),
      });
      const result = await usernameCheck.json();
      if (result.match) {
        setMessage("Username is taken");
        return nameInput.current.focus();
      }
      return setMessage("Username available");
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
          Register
        </h1>

        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Registration locked
        </h3>
        {/* <h3 className="text-center">{error ? error : "\u00A0"}</h3> */}

        <div className="mb-3">
          <input
            disabled
            className="form-control form-control-lg text-center"
            ref={nameInput}
            onBlur={checkUsername}
            autoFocus
            type="text"
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
        </div>
        <div className="mb-3">
          <input
            disabled
            className="form-control form-control-lg text-center"
            tabIndex="0"
            type="password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            // onKeyUp={({ key }) => {
            //   if (key === "Enter") onRegister();
            // }}
          />
        </div>
        <button
          disabled
          className="btn btn-primary btn-lg mb-3"
          style={{ width: "100%" }}
          // onClick={onRegister}
        >
          Register
        </button>
        <Link to="/" className="btn btn-primary btn-lg w-100 mb-3">
          Back to home
        </Link>
        <div className="d-flex justify-content-between align-items-center">
          <h3 style={{ margin: 0, fontSize: "1.3rem" }}>
            Already have
            <br />
            account?
          </h3>
          <Link to="/login" className="btn btn-warning btn-lg w-50">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
