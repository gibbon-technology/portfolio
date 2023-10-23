export default function SUDOChat_Window({ user, messageList, loading }) {
  if (!messageList.length) return <h1 className="my-3">No messages</h1>;
  if (loading) return <h1 className="my-3">Loading messages...</h1>;

  return (
    <div style={{ width: "100%", margin: "50px 0 200px 0" }}>
      {messageList.map((message, index) => (
        <div
          key={index}
          style={{
            border: "2px solid black",
            backgroundColor:
              message.toUsername === user.username ? "white" : "#1982FC",
            color: message.toUsername === user.username ? "black" : "white",
            borderRadius: "10px",
            width: "100%",
            textAlign: "center",
            margin: "15px 0",
            padding: "15px",
          }}
        >
          <h2 style={{ paddingTop: "10px" }}>{message.fromName}</h2>
          <hr />
          <h3
            style={{
              padding: "10px",
              overflowWrap: "break-word",
              hyphens: "auto",
            }}
          >
            {message.message}
          </h3>
          <span>{new Date(message.time).toLocaleDateString()}</span>
          <span>&nbsp;@&nbsp;</span>

          <span>{new Date(message.time).toLocaleTimeString()}</span>
        </div>
      ))}
    </div>
  );
}
