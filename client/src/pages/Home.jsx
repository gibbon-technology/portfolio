import { useEffect, useState } from "react";
import gt_logo from "../assets/logos/gibbon_logo.png";
import sec_plus from "../assets/sec_plus.png";
import github from "../assets/logos/github.png";
import redrockFetch from "../fetch.js";
import { Link } from "react-router-dom";

export default function Home() {
  const color1 = "#032631";
  const color2 = "#c6e0e9";
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
      <img
        src={gt_logo}
        alt="Gibbon Technology Logo"
        width="275px"
        style={{ margin: "125px 0" }}
      />

      <img
        src={sec_plus}
        alt="CompTIA Security+ logo"
        width="300px"
        style={{ marginBottom: "100px" }}
      />
      <h2
        style={{
          marginTop: "50px",
          textAlign: "center",
          width: "95%",
          maxWidth: "600px",
          backgroundColor: color2,
          color: color1,
          padding: "50px 0",
          borderRadius: "20px",
          fontWeight: "500",
        }}
      >
        IT Intern
        <br />
        at StatsLog Software
      </h2>

      <Link
        to="/resume"
        onMouseOver={(e) => {
          e.target.style.opacity = 0.75;
        }}
        onMouseOut={(e) => {
          e.target.style.opacity = 1;
        }}
        style={{
          marginTop: "50px",
          fontSize: "2rem",
          borderRadius: "20px",
          textAlign: "center",
          width: "95%",
          maxWidth: "600px",
          backgroundColor: color2,
          color: color1,
          padding: "50px 0",
          fontWeight: "500",
          textDecoration: "none",
        }}
      >
        View resume
      </Link>

      <Link
        to="https://blog.gibbontechnology.ca"
        onMouseOver={(e) => {
          e.target.style.opacity = 0.75;
        }}
        onMouseOut={(e) => {
          e.target.style.opacity = 1;
        }}
        style={{
          marginTop: "50px",
          fontSize: "2rem",
          borderRadius: "20px",
          textAlign: "center",
          width: "95%",
          maxWidth: "600px",
          backgroundColor: color2,
          color: color1,
          padding: "50px 0",
          fontWeight: "500",
          textDecoration: "none",
        }}
      >
        View my blog
      </Link>

      <div
        style={{
          marginTop: "50px",
          width: "95%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3
          style={{ textAlign: "center", marginTop: "50px", fontSize: "2.5rem" }}
        >
          Direct email
        </h3>
        <h3
          style={{
            textAlign: "center",
            marginBottom: "50px",
            fontSize: "1.8rem",
          }}
        >
          <a
            href="mailto:ryan.codes@icloud.com"
            style={{ textDecoration: "none", color: "darkgrey" }}
            onMouseOver={(e) => {
              e.target.style.opacity = 0.75;
            }}
            onMouseOut={(e) => {
              e.target.style.opacity = 1;
            }}
          >
            ryan@gibbontechnology.ca
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
          <img src={github} alt="Github logo" style={{ maxWidth: "100px" }} />
        </a>
      </div>
      {loading ? (
        <h1 style={{ margin: "150px 0" }}>Loading...</h1>
      ) : updates.length > 0 ? (
        <div
          style={{
            margin: "100px 0",
            width: "90%",
            maxWidth: "600px",
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
