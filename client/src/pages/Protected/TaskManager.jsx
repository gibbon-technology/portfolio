import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import redrockFetch from "../../fetch.js";

export default function TaskManager({ user, token }) {
  const [tasks, setTasks] = useState(null);
  const [newTaskName, setnewTaskName] = useState("");

  const fetchTasks = async () => {
    if (user) {
      const tasks = await redrockFetch(
        `/api/admin/get-tasks?username=${user.username}`,
        "get",
        null,
        token
      );
      setTasks(tasks);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTaskName.length > 2 && user) {
      const newOBJ = {
        name: newTaskName,
        createdAt: Date.now(),
        id: v4(),
      };
      let newStateTaskOBJ = [newOBJ];
      if (tasks) newStateTaskOBJ = [...tasks, newOBJ];
      setTasks(newStateTaskOBJ);
      const newTask = await redrockFetch(
        "/api/admin/new-task",
        "post",
        { task: newOBJ, username: user.username },
        token
      );
      setnewTaskName("");
    }
  };

  const removeTask = (_id) => {
    if (user) {
      const updatedList = tasks.filter((task) => task.id != _id);
      setTasks(updatedList);
      redrockFetch(
        `/api/admin/delete-task?username=${user.username}&id=${_id}`,
        "get",
        null,
        token
      );
    }
  };

  return (
    <div
      style={{
        borderRadius: "20px",
        padding: "20px",
        height: "100%",
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          margin: "20px auto",
          color: "white",
          width: "90vw",
          maxWidth: "400px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 className="mb-5">Tasks for {user.name}</h2>

        <div className="input-group">
          <input
            autoFocus
            type="text"
            className="form-control"
            placeholder="Enter task"
            value={newTaskName}
            onChange={({ target }) => setnewTaskName(target.value)}
            onKeyUp={({ key }) => {
              if (key === "Enter") addTask();
            }}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary btn-lg"
              disabled={newTaskName.length < 3 ? true : false}
              type="button"
              onClick={addTask}
            >
              Add Task
            </button>
          </div>
        </div>

        <div className="w-100 my-3 d-flex flex-column align-items-center justify-content-center">
          <ul className="w-100 px-0">
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <div className="d-flex my-3" key={task.id}>
                  <li className="list-group-item active text-center w-75">
                    {task.name}
                  </li>
                  <button
                    id={task.id}
                    className="btn btn-danger w-25"
                    onClick={({ target }) => removeTask(target.id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <h1 style={{ textAlign: "center" }}>No tasks</h1>
            )}
          </ul>
          <Link to="/dashboard" className="btn btn-warning btn-lg w-100">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
