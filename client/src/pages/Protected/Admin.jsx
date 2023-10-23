import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import redrockFetch from "../../fetch.js";

export default function Admin({ user, token }) {
  const [newKeyName, setNewKeyName] = useState("");
  const nameInput = useRef();
  const createButton = useRef();

  const handleCreateKeys = async () => {
    if (newKeyName.length < 3) return;
    if (user.isSudo) {
      createButton.current.disabled = true;
      nameInput.current.disabled = true;
      const { success, msg } = await redrockFetch(
        "/api/admin/create-key",
        "post",
        { name: newKeyName },
        token
      );
      if (success) {
        setNewKeyName(msg);
        setTimeout(() => {
          setNewKeyName("");
          createButton.current.disabled = false;
          nameInput.current.disabled = false;
        }, 1_000);
        return setNewKeyName(msg);
      }
      // if !success
      setNewKeyName(msg);
      setTimeout(() => {
        createButton.current.disabled = false;
        nameInput.current.disabled = false;
        setNewKeyName(newKeyName);
        nameInput.current.focus();
      }, 1_000);
    }
  };
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <>
        <h2>Admin Section</h2>
        <div
          className="input-group mb-4
        
         w-100"
          style={{ maxWidth: "450px" }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={newKeyName}
            ref={nameInput}
            disabled={user.isSudo ? false : true}
            onChange={({ target }) => setNewKeyName(target.value)}
            onKeyUp={({ key }) => {
              if (key === "Enter" && user.isSudo) return handleCreateKeys();
            }}
          />
          <div className="input-group-append">
            <button
              ref={createButton}
              tabIndex="0"
              className="btn btn-primary btn-lg"
              type="button"
              onClick={handleCreateKeys}
              disabled={newKeyName.length < 3 ? true : false}
            >
              Create Key
            </button>
          </div>
        </div>
        <div className="mb-2 w-100">
          <Link to="/send-email" className="btn btn-primary btn-lg w-100 my-2">
            Send email
          </Link>
          <Link
            to="/schedule-email"
            className="btn btn-primary btn-lg w-100 my-2"
          >
            Schedule email
          </Link>
          <Link to="/add-update" className="btn btn-primary btn-lg w-100 my-2">
            Add updates
          </Link>
          <Link
            to="/manage-users"
            className="btn btn-primary btn-lg w-100 my-2"
          >
            Manage users
          </Link>
        </div>
      </>
    </div>
  );
}
