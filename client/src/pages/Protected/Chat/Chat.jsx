export default function Chat({ message, username }) {
  return (
    <div
      style={{
        margin: "20px 0",
        width: "90vw",
        maxWidth: "400px",
        padding: "15px",
        border: "2px solid black",
        borderRadius: "10px",
        textAlign: "center",
        backgroundColor: message.toUsername === username ? "white" : "#1982FC",
        color: message.toUsername === username ? "black" : "white",
      }}
    >
      <h2>{message.fromName}</h2>
      <hr />
      <h2
        style={{
          padding: "10px",
          overflowWrap: "break-word",
          hyphens: "auto",
        }}
      >
        {message.message}
      </h2>
      <hr />
      <h4 style={{ fontSize: "1rem" }}>
        {new Date(message.time).toLocaleTimeString()}
      </h4>
    </div>
  );
}
