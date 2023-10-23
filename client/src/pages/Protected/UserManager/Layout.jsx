import { useEffect, useState } from "react";
import AddUser from "./AddUser";
import UserList from "./UserList";
import redrockFetch from "../../../fetch.js";

export default function UserLayout({ user, token }) {
  const [companyLogins, setCompanyLogins] = useState([]);

  const onSearch = async (search) => {
    const req = await fetch(`/api/admin/search-users?username=${search}`, {
      method: "GET",
      headers: {
        authentication: `Bearer ${token}`,
      },
    });
    const data = await req.json();
    setCompanyLogins(data.data);
  };

  const getCompanyKeys = async () => {
    const data = await redrockFetch(
      "/api/admin/getCompanyKeys",
      "get",
      null,
      token
    );
    setCompanyLogins(data);
  };

  const handleAddUser = async (username, password, isSudo) => {
    await redrockFetch(
      "/api/admin/addNewUser",
      "post",
      { username, password, isSudo },
      token
    );
    getCompanyKeys();
  };

  const handleKeyDelete = async (selectedKey) => {
    await redrockFetch(
      `/api/admin/deleteKey?username=${selectedKey}`,
      "get",
      null,
      token
    );
    getCompanyKeys();
  };

  const handleResetCount = async (username) => {
    await redrockFetch(
      `/api/admin/updateCount?username=${username}`,
      "get",
      null,
      token
    );
    getCompanyKeys();
  };

  useEffect(() => {
    getCompanyKeys();
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "400px", margin: "30px" }}>
      <AddUser handleAddUser={handleAddUser} />
      <UserList
        companyLogins={companyLogins}
        handleResetCount={handleResetCount}
        handleKeyDelete={handleKeyDelete}
        onSearch={onSearch}
      />
    </div>
  );
}
