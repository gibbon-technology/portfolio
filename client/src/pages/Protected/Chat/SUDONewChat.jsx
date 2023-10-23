import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";
import redrockFetch from "../../../fetch.js";
import "react-dropdown/style.css";

export default function SUDONewChat({
  user,
  token,
  userList,
  selectedUser,
  changeSelectedUser,
  leavePage,
  getMessages,
}) {
  const nav = useNavigate();

  const [message, setMessage] = useState("");
  const messageBox = useRef();
  const SendButton = useRef();
  const userInput = useRef();

  const sendDM = async () => {
    if (message.trim().length > 2 && selectedUser) {
      const msg = await redrockFetch(
        "/api/admin/send-instant-message",
        "post",
        {
          fromName: user.name,
          fromUsername: user.username,
          toUsername: selectedUser,
          message,
        },
        token
      );
      setMessage("");
      getMessages();
      userInput.current.focus();
    }
  };

  return (
    <>
      <h2 className="my-3" style={{ textAlign: "center", fontSize: "2.5rem" }}>
        New message
      </h2>
      <Dropdown
        className="w-100"
        ref={userInput}
        options={userList}
        onChange={({ value }) => changeSelectedUser(value)}
        value={selectedUser ? selectedUser : "Choose user"}
      />
      <textarea
        autoFocus
        placeholder="Message"
        className="mt-2"
        rows="5"
        style={{ padding: "10px", width: "100%" }}
        value={message}
        onChange={({ target }) => setMessage(target.value)}
        onKeyDown={({ altKey, key }) => {
          if (altKey && key === "Enter") return setMessage(message + "\r\n");
          if (!altKey && key === "Enter") sendDM();
        }}
        ref={messageBox}
      />
      <button
        className="btn btn-primary btn-lg d-block w-100 my-2"
        onClick={sendDM}
        ref={SendButton}
      >
        Send
      </button>
      <button
        className="btn btn-warning btn-lg d-block w-100"
        onClick={() => {
          leavePage();
          nav("/dashboard");
        }}
      >
        Close
      </button>
    </>
  );
}
