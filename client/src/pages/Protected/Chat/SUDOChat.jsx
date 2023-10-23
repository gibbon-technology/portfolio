import { useState, useEffect } from "react";
import SUDOChat_window from "./SUDOChat_window";
import SUDONewChat from "./SUDONewChat";
import redrockFetch from "../../../fetch.js";
import config from "../../../app_config.js";

export default function SUDOChat({ user, token }) {
  const [selectedUser, setSelectedUser] = useState(
    localStorage.getItem("redrock_selectedUser")
  );
  const [userList, setUserList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    const data = await redrockFetch(
      "/api/admin/getAllUsers",
      "get",
      null,
      token
    );
    setUserList(data);
  };

  const getMessages = async (
    selected = localStorage.getItem("redrock_selectedUser")
  ) => {
    if (!loading) setLoading(true);

    const data = await redrockFetch(
      "/api/admin/getMessages",
      "get",
      null,
      token,
      selected
    );
    setLoading(false);
    setMessageList(data);
  };

  useEffect(() => {
    getUsers();
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

  const changeSelectedUser = async (selected) => {
    setSelectedUser(selected);
    getMessages(selected);
    localStorage.setItem("redrock_selectedUser", selected);
  };

  const leavePage = () =>
    localStorage.setItem("redrock_selectedUser", selectedUser);

  return (
    <div
      style={{
        borderRadius: "10px",
        height: "100%",
        width: "90%",
        maxWidth: "450px",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SUDONewChat
        user={user}
        token={token}
        userList={userList}
        selectedUser={selectedUser}
        changeSelectedUser={changeSelectedUser}
        leavePage={leavePage}
        getMessages={getMessages}
      />
      <SUDOChat_window
        user={user}
        messageList={messageList}
        loading={loading}
      />
    </div>
  );
}
