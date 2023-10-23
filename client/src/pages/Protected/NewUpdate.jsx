import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import redrockFetch from "../../fetch.js";
import moment from "moment";

export default function NewUpdate({ user, token }) {
  const navigate = useNavigate();

  const [month, day, year] = moment().format("MMMM_DD_YYYY").split("_");

  const [date, setDate] = useState(`${month} ${day}, ${year}`);
  const [details, setDetails] = useState("");
  const [updatedAdded, setUpdateAdded] = useState(false);
  const addRef = useRef();
  const backRef = useRef();

  const addUpdate = async () => {
    if (details.length > 8) {
      addRef.current.disabled = true;
      backRef.current.disabled = true;
      setUpdateAdded(true);
      const { success } = await redrockFetch(
        "/api/admin/new-update",
        "post",
        { date, details },
        token
      );
      if (success) {
        setTimeout(() => {
          addRef.current.disabled = false;
          backRef.current.disabled = false;
          setUpdateAdded(false);
          navigate("/dashboard");
        }, 2_000);
        addRef.current.textContent = "Update created";
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "500px",
        borderRadius: "20px",
        padding: "20px",
        overflowY: "hidden",
      }}
    >
      <div
        style={{
          visibility: updatedAdded ? "hidden" : "visible",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          Add Update
        </h1>
        <input
          className="form-control form-control-lg mb-3"
          type="text"
          style={{
            borderRadius: "10px",
          }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <textarea
          className="form-control form-control-lg mb-3"
          style={{
            minHeight: "200px",
          }}
          placeholder="Update details"
          autoFocus
          value={details}
          onChange={({ target }) => setDetails(target.value)}
          onKeyDown={({ key }) => (key === "Enter" ? addUpdate() : null)}
        />
      </div>
      <button
        ref={addRef}
        onClick={addUpdate}
        className="btn btn-primary btn-lg mb-3 w-100"
      >
        Add update
      </button>
      <button
        className="btn btn-warning btn-lg w-100"
        onClick={() => navigate("/dashboard")}
        ref={backRef}
      >
        Close
      </button>
    </div>
  );
}
