import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import redrockFetch from "../../fetch.js";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function ({ token }) {
  const nav = useNavigate();
  const submitButton = useRef();

  const [time, setTime] = useState(new Date());
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    const emailData = { time, to, subject, text: message };
    const _time = new Date(time).toLocaleTimeString();
    await redrockFetch(
      "/api/admin/schedule-email",
      "post",
      { emailData },
      token
    );
    submitButton.current.disabled = true;
    submitButton.current.innerText = "Email scheduled";
    setStatus(`Message to ${to} scheduled for ${_time}`);
    setTime(new Date());
    setTo("");
    setSubject("");
    setMessage("");
  };

  return (
    <div
      style={{
        marginBottom: "100px",
        borderRadius: "20px",
        padding: "20px",
        height: "100%",
        width: "100%",
        maxWidth: "450px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Schedule email</h2>
      <h5 className="text-center my-3">{status}</h5>
      <Datetime
        onChange={({ _d }) => setTime(_d)}
        value={time}
        className="my-2 w-100 text-dark"
      />
      <input
        autoFocus
        placeholder="Send to:"
        type="text"
        className="form-control my-2"
        value={to}
        onChange={({ target }) => setTo(target.value)}
      />
      <input
        placeholder="Subject"
        type="text"
        className="form-control my-2"
        value={subject}
        onChange={({ target }) => setSubject(target.value)}
      />
      <textarea
        rows="8"
        className="form-control my-2"
        placeholder="Enter message"
        value={message}
        onChange={({ target }) => setMessage(target.value)}
      />
      <button
        disabled={
          to.length < 5 && subject.length < 3 && message.length < 5
            ? true
            : false
        }
        ref={submitButton}
        className="btn btn-primary btn-lg my-2 w-100"
        onClick={handleSubmit}
      >
        Schedule
      </button>
      <button
        className="btn btn-warning btn-lg my-2 w-100"
        onClick={() => nav("/dashboard")}
      >
        Cancel
      </button>
      {/* <EmailsToBeSent token={token} /> */}
    </div>
  );
}
