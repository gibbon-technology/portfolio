import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout({ alert }) {
  const [active, setActive] = useState(false);
  const nav = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#032631",
        color: "#c6e0e9",
      }}
    >
      <Sidebar alert={alert} />
      <h6
        onMouseOver={() => setActive(true)}
        onMouseOut={() => setActive(false)}
        onClick={() => nav("/chat")}
        style={{
          marginTop: "20px",
          textAlign: "center",
          cursor: active ? "pointer" : "default",
          color: active ? "white" : "#c6e0e9",
        }}
      >
        {alert}
      </h6>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
