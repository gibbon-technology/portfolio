import { useEffect, useState } from "react";
import github from "../assets/logos/github.png";
import redrockFetch from "../fetch.js";

export default function Home() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUpdates = async () => {
    const data = await redrockFetch("/api/base/get-updates", "get");
    setUpdates(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchUpdates();
  }, []);

  return (
    <>
      <div
        style={{
          margin: "20px 0",
          width: "95%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          My name is Ryan, welcome to my portfolio website. Below is a link to
          my Github to view all of my repositories.
        </h2>
        <h2
          style={{
            margin: "20px",
            width: "100%",
            textAlign: "center",
            backgroundColor: "#c6e0e9",
            color: "#032631",
            padding: "1rem",
            border: "1px solid white",
            borderRadius: "10px",
          }}
        >
          Looking for work
        </h2>
        <h3 style={{ textAlign: "center" }}>Direct email</h3>
        <h3 style={{ textAlign: "center", marginBottom: "50px" }}>
          <a
            href="mailto:ryan.codes@icloud.com"
            style={{ textDecoration: "none", color: "#1982fc" }}
          >
            ryan.codes@icloud.com
          </a>
        </h3>

        <a
          style={{
            border: "1px solid white",
            borderRadius: "50%",
            padding: "10px",
          }}
          href="https://github.com/redrock-software"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github} alt="Github logo" style={{ maxWidth: "75px" }} />
        </a>
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : updates.length > 0 ? (
        <div
          style={{
            margin: "0px 0",
            width: "90%",
            maxWidth: "600px",
            marginBottom: "100px",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              textAlign: "center",
            }}
          >
            Updates
          </h1>
          {updates.map((change) => (
            <div
              key={change._id}
              style={{
                textAlign: "center",
                backgroundColor: "#1982FC",
                padding: "20px",
                border: "2px solid black",
                borderRadius: "20px",
                margin: "20px 0",
              }}
            >
              <h2 style={{ fontSize: "1.6rem" }}>{change._date}</h2>
              <hr />
              <p style={{ fontSize: "1.4rem", wordWrap: "break-word" }}>
                {change.details}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <h1 style={{ marginBottom: "150px" }}>No updates</h1>
      )}
    </>
  );
}
