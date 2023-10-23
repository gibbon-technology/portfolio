import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import redrockFetch from "../../fetch.js";

export default function SendEmail({ user, token }) {
  const submitButton = useRef();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [email, setEmail] = useState({ to: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSendEmail = async () => {
    submitButton.current.disabled = true;
    if (user) {
      setShowConfirmation(true);
      const { success, msg } = await redrockFetch(
        "/api/admin/send-email",
        "post",
        { email, username: user.username },
        token
      );
      setStatus(msg);
      setLoading(false);
      setEmail({ to: "", subject: "", message: "" });
      setTimeout(() => {
        setStatus("");
        setShowConfirmation(false);
        navigate("/dashboard");
      }, 2_500);
    }
  };

  return (
    <div
      style={{
        borderRadius: "20px",
        padding: "20px",
        height: "100%",
        width: "100%",
        maxWidth: "500px",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="text-center mx-auto w-100"
        style={{
          display: showConfirmation ? "block" : "none",
          visibility: showConfirmation ? "visible" : "hidden",
        }}
      >
        <h2 style={{ fontSize: "2.5rem" }}>
          {loading ? "Sending message..." : status}
        </h2>
      </div>
      <div
        style={{
          display: showConfirmation ? "none" : "block",
          visibility: showConfirmation ? "hidden" : "visible",
        }}
        className="form-group d-flex flex-column w-100"
      >
        <h1
          style={{
            fontSize: "2.5rem",
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          Email Details
        </h1>
        <input
          autoFocus
          type="email"
          required
          placeholder="Recipient"
          className="mb-3 form-control form-control-lg"
          value={email.to}
          onChange={({ target }) =>
            setEmail({
              to: target.value,
              subject: email.subject,
              message: email.message,
            })
          }
        />
        <input
          type="text"
          placeholder="Subject"
          className="mb-3 form-control form-control-lg"
          value={email.subject}
          onChange={({ target }) =>
            setEmail({
              to: email.to,
              subject: target.value,
              message: email.message,
            })
          }
        />
        <textarea
          placeholder="Message"
          className="mb-3 form-control form-control-lg"
          style={{ height: "150px", overflowY: "scroll" }}
          value={email.message}
          onChange={({ target }) =>
            setEmail({
              to: email.to,
              subject: email.subject,
              message: target.value,
            })
          }
        />

        <button
          className="btn btn-primary btn-lg mb-3"
          onClick={handleSendEmail}
          ref={submitButton}
        >
          Send
        </button>
        <button
          className="btn btn-warning btn-lg"
          onClick={() => navigate("/dashboard")}
        >
          Close
        </button>
      </div>
    </div>
  );
}
