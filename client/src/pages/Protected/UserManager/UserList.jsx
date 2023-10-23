export default function UserList({
  companyLogins,
  handleResetCount,
  handleKeyDelete,
  onSearch,
}) {
  return (
    <div>
      <input
        type="text"
        className="form-control form-control-lg text-center mb-3"
        placeholder="Search"
        onChange={({ target }) => onSearch(target.value)}
      />

      <div>
        {companyLogins.length > 0 ? (
          companyLogins.map((_key, index) => {
            return (
              <div
                key={index}
                style={{
                  margin: "50px 0",
                }}
              >
                <h3 className="text-center fs-1" style={{ fontWeight: 700 }}>
                  {_key.username}
                </h3>
                <h3 className="text-center my-3">{_key.password}</h3>
                <p
                  className="text-center"
                  onDoubleClick={() => handleResetCount(_key.username)}
                  style={{
                    fontWeight: 700,
                    padding: "1rem",
                    borderRadius: "5px",
                    backgroundColor: _key.count > 0 ? "white" : "black",
                    color: _key.count > 0 ? "Black" : "unset",
                  }}
                >
                  Login count: {_key.count}
                </p>
                <button
                  id={_key.username}
                  onDoubleClick={({ target }) => handleKeyDelete(target.id)}
                  className="btn btn-danger btn-lg w-100"
                >
                  Delete user
                </button>
              </div>
            );
          })
        ) : (
          <h1 className="text-center my-3">No users</h1>
        )}
      </div>
    </div>
  );
}
