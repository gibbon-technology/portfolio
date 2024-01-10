import sec from "../assets/8X27sg_400px.png";

export default ({ oppositeTheme, darkMode, setDarkMode }) => {
  return (
    <div>
      <div className="header">
        <div className="header-left">
          <div className="header-info">
            <h1 className="header-name">Ryan David</h1>
            <h3 className="header-title">Junior Security Analyst</h3>
          </div>
          <img
            className="sec-logo"
            src={sec}
            alt="Security+ logo"
            width="125px"
          />
        </div>
        <div className="buttons">
          <button
            className="header-right"
            style={{ ...oppositeTheme, marginRight: "10px" }}
          >
            <a
              href="mailto:admin@redrocksoftware.ca"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Contact
            </a>
          </button>

          <button
            className="header-right"
            style={oppositeTheme}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </div>
    </div>
  );
};
