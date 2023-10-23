import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import redrockFetch from "../../fetch.js";
import code from "../../assets/codeExample.png";

export default function ({ user, token }) {
  const nav = useNavigate();
  const startDiv = useRef();
  const resultDiv = useRef();
  const runButton = useRef();
  const [count, setCount] = useState();

  const getLineCount = async () => {
    runButton.current.disabled = true;
    runButton.current.innerText = "Running Python script";
    startDiv.current.hidden = true;
    resultDiv.current.hidden = false;
    const count = await redrockFetch(
      "/api/admin/get-line-count",
      "get",
      null,
      token
    );
    setTimeout(() => {
      setCount(count);
      runButton.current.hidden = true;
    }, 1_500);
  };

  const divStyles = {
    margin: "20px 0",
    width: "90%",
    maxWidth: "450px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  };

  return (
    <div style={divStyles}>
      <div
        style={divStyles}
        hidden
        dangerouslySetInnerHTML={{ __html: count }}
        ref={resultDiv}
      ></div>
      <div ref={startDiv}>
        <img
          src={code}
          alt="Code example"
          title="RUN CODE"
          style={{
            borderRadius: "10px",
            border: "5px solid black",
            width: "100%",
          }}
        />
      </div>
      <button
        ref={runButton}
        className="btn btn-primary btn-lg w-100 my-3"
        onClick={getLineCount}
      >
        Run code
      </button>
      <button
        className="btn btn-warning btn-lg my-3 w-100"
        onClick={() => nav("/dashboard")}
      >
        Close
      </button>
    </div>
  );
}
