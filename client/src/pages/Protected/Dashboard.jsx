import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import redrockFetch from "../../fetch.js";
import Admin from "./Admin";

export default function Dashboard({ user, token, signout }) {
  const { name, isSudo } = user;
  const [expiresAt, setExpiresAt] = useState();

  const authCheck = async () => {
    const { success, expiresAt } = await redrockFetch(
      "/api/admin/auth-check",
      "get",
      null,
      token
    );
    if (!success) return signout();
    setExpiresAt(Math.round((expiresAt.exp - expiresAt.now) / 60));
  };

  useEffect(() => {
    authCheck();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      authCheck();
    }, 60_000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      style={{
        marginBottom: "100px",
        borderRadius: "20px",
        padding: "20px",
        height: "100%",
        width: "100%",
        maxWidth: "450px",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ textAlign: "center", fontSize: "2.5rem" }}>Welcome</h2>

      <h2 style={{ textAlign: "center", fontSize: "2.5rem" }}>{name}</h2>
      <h6>Session expires in {expiresAt} minute(s)</h6>

      {isSudo ? <Admin user={user} token={token} /> : null}

      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <hr />
        <Link to="/chat" className="btn btn-primary btn-lg w-100 mb-3">
          Chat
        </Link>
        <Link to="/task-manager" className="btn btn-primary btn-lg mb-3">
          Task manager
        </Link>
        <Link to="/grades" className="btn btn-primary btn-lg mb-3">
          View grades
        </Link>
        <Link to="/line-count" className="btn btn-primary btn-lg mb-3">
          Get line count
        </Link>
        <Link to="/image-compressor" className="btn btn-primary btn-lg mb-3">
          Image compressor
        </Link>
      </div>

      <Link to="/" onClick={signout} className="btn btn-warning btn-lg w-100">
        Sign out
      </Link>
    </div>
  );
}
