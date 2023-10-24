import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PasswordGen({ user, token }) {
  const [length, setLength] = useState(16);
  const [createdPassword, setCreatedPassword] = useState(null);
  const nav = useNavigate();

  const generatePassword = async (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";

    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setCreatedPassword(retVal);
  };

  const createPassword = () => {
    return (
      <>
        <h4 className="text-center">
          Create password for
          <br />
          <strong>{user.name}</strong>
        </h4>
        <label className="w-100 text-center fs-5 my-3" htmlFor="charLength">
          Password length: {length} characters
        </label>
        <input
          name="charLength"
          type="range"
          min="5"
          max="64"
          value={length}
          onChange={({ target }) => setLength(target.value)}
          className="slider d-block w-100 my-3"
          id="myRange"
        />
        <button
          className="btn btn-primary btn-lg w-100 my-3"
          onClick={() => generatePassword(length)}
        >
          Generate password
        </button>
      </>
    );
  };

  const passwordDisplay = () => {
    if (!createdPassword) return null;
    return (
      <>
        <hr style={{ margin: "40px 0" }} />
        <div className="d-flex w-100 justify-content-between">
          <h5 style={{ overflowX: "auto", lineHeight: "75px", width: "70%" }}>
            {createdPassword}
          </h5>
          <button
            className="btn btn-secondary w-25"
            onClick={() => navigator.clipboard.writeText(createdPassword)}
          >
            Copy
          </button>
        </div>
      </>
    );
  };

  return (
    <div
      style={{
        width: "95%",
        maxWidth: "600px",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          border: "2px solid white",
          borderRadius: "10px",
          padding: "50px",
        }}
      >
        {createPassword()}
        {passwordDisplay()}
      </div>
      <button
        className="btn btn-warning btn-lg w-100 my-5"
        onClick={() => nav("/dashboard")}
      >
        Back
      </button>
    </div>
  );
}
