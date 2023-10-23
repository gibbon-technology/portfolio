import { useState } from "react";
import { Link } from "react-router-dom";
import redrockFetch from "../../fetch.js";

export default function Grades({ user, token }) {
  const [currentGrades, setCurrentGrades] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  const backClass = "btn btn-warning btn-lg w-100 my-2 mb-5";
  const activeClass = "btn btn-secondary btn-lg w-100 my-2";
  const inactiveClass = "btn btn-primary btn-lg w-100 my-2";

  const subjects = [
    "Web Dev",
    "Programming",
    "Engineering",
    "Elective",
    "Math",
  ];

  const fetchGrades = async (subject) => {
    const data = await redrockFetch(
      `/api/admin/get-grades?subject=${subject}`,
      "get",
      null,
      token
    );
    setCurrentGrades(data);
  };

  return (
    <div
      style={{
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
      <div
        style={{
          overflowY: "hidden",
          whiteSpace: "pre-line",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {subjects.map((subject) => (
          <button
            className={activeButton === subject ? activeClass : inactiveClass}
            key={subject}
            onClick={() => {
              setActiveButton(subject);
              fetchGrades(subject);
            }}
          >
            {subject}
          </button>
        ))}
        <Link className={backClass} to="/dashboard">
          Back
        </Link>

        <div style={{ width: "95%", fontSize: "1.3rem" }}>{currentGrades}</div>
      </div>
    </div>
  );
}
