import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddUser({ handleAddUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSudo, setIsSudo] = useState(false);
  const [showELement, setShowElement] = useState(false);

  const nav = useNavigate();

  const showButton = () => {
    return (
      <>
        <button
          className="btn btn-primary btn-lg w-100"
          onClick={() => setShowElement(true)}
        >
          Add user
        </button>
        <button
          className="btn btn-warning btn-lg my-3 w-100"
          onClick={() => nav("/dashboard")}
        >
          Close
        </button>
      </>
    );
  };

  const showAddUser = () => {
    const inputStyles = {
      display: "block",
      width: "100%",
      fontSize: "1.6rem",
      textAlign: "center",
      margin: "15px 0",
    };

    return (
      <div
        style={{
          border: "5px solid black",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "3rem" }}>Add new user</h2>
        <input
          autoFocus
          autoCapitalize="off"
          type="text"
          placeholder="Username"
          style={inputStyles}
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          style={inputStyles}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <select
          style={{ width: "100%", textAlign: "center", fontSize: "1.6rem" }}
          onChange={({ target }) => setIsSudo(target.value)}
          defaultValue="isSudo"
        >
          <option disabled hidden>
            isSudo
          </option>
          <option>True</option>
          <option>False</option>
        </select>
        <button
          className="btn btn-primary btn-lg mt-3 w-100"
          disabled={username.length < 3 || password.length < 3 ? true : false}
          onClick={() => {
            if (username.length < 3 || password.length < 3) return;
            handleAddUser(username, password, isSudo);
            setUsername("");
            setPassword("");
            setIsSudo(false);
            setShowElement(false);
          }}
        >
          Add user
        </button>
        <button
          className="btn btn-warning btn-lg mt-3 w-100"
          onClick={() => setShowElement(false)}
        >
          Cancel
        </button>
      </div>
    );
  };

  if (showELement) return showAddUser();
  return showButton();
}
