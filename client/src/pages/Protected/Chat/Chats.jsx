import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";
import redrockFetch from "../../../fetch.js";
import config from "../../../app_config.js";

export default function Chats({ user, token }) {
  const nav = useNavigate();

  const messageInputRef = useRef();
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const getMessages = async () => {
    const data = await redrockFetch(
      `/api/admin/getMessages`,
      "get",
      null,
      token
    );
    setMessageList(data);
  };

  const sendDM = async () => {
    if (message.trim().length > 2) {
      const data = await redrockFetch(
        "/api/admin/send-instant-message",
        "post",
        { fromName: user.name, fromUsername: user.username, message },
        token
      );
      messageInputRef.current.focus();
      setMessage("");
      getMessages();
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMessages();
    }, config.newMessageCheckInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      style={{
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
      <h2 style={{ textAlign: "center" }}>Message Ryan @ RedRockSoftware</h2>
      <textarea
        autoFocus
        ref={messageInputRef}
        placeholder="Enter message"
        rows="5"
        className="form-control form-control-lg my-2"
        value={message}
        onChange={({ target }) => setMessage(target.value)}
        onKeyDown={({ key }) => {
          if (key === "Enter") sendDM();
        }}
      />
      <button
        className="btn btn-primary btn-lg w-100 d-block my-2"
        onClick={sendDM}
      >
        Send
      </button>
      <button
        className="btn btn-warning btn-lg w-100 d-block mb-2"
        onClick={() => nav("/dashboard")}
      >
        Close
      </button>

      <hr />
      <div
        style={{
          marginBottom: "150px",
        }}
      >
        {messageList.length > 0 ? (
          messageList.map((message, index) => (
            <Chat key={index} message={message} username={user.username} />
          ))
        ) : (
          <h1>No messages</h1>
        )}
      </div>
    </div>
  );
}
