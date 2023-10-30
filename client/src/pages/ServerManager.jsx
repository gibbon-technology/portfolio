import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import redrockFetch from "../fetch.js";

export default function ServerManager({ user, token }) {
  const [status, setStatus] = useState();
  const [message, setMessage] = useState();

  const startButton = useRef();
  const stopButton = useRef();
  const backButton = useRef();

  const nav = useNavigate();

  const getStatus = async () => {
    const data = await redrockFetch(
      "/api/admin/get-server-status",
      "get",
      null,
      token
    );
    setStatus(data);
  };

  const startServer = async () => {
    if (user) {
      setMessage("Starting server... PLEASE WAIT");
      startButton.current.disabled = "true";
      const data = await redrockFetch(
        "/api/admin/start-server",
        "get",
        null,
        token
      );
      setMessage(data);
      getStatus();
    }
  };

  const stopServer = async () => {
    if (user) {
      setMessage("Stopping server... PLEASE WAIT");
      stopButton.current.disabled = "true";
      const data = await redrockFetch(
        "/api/admin/stop-server",
        "get",
        null,
        token
      );
      setMessage(data);
      getStatus();
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div
      style={{
        width: "95%",
        maxWidth: "450px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 className="text-center my-5">Nighthawk Minecraft server</h2>

      <h3 className="my-3">Server is currently {status}</h3>

      <button
        className="btn btn-primary btn-lg d-block w-100 my-3"
        disabled={status === "active" ? true : false}
        onClick={startServer}
        ref={startButton}
      >
        Start server
      </button>
      <button
        ref={stopButton}
        className="btn btn-primary btn-lg d-block w-100 my-3"
        disabled={status === "inactive" ? true : false}
        onClick={stopServer}
      >
        Stop server
      </button>

      <h4 className="my-3">{message}</h4>

      <button
        ref={backButton}
        className="btn btn-warning btn-lg d-block w-100 my-5"
        onClick={() => nav("/dashboard")}
      >
        Back to dashboard
      </button>
    </div>
  );
}
