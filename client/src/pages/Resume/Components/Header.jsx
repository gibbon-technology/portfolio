import sec_logo from "../../../assets/logos/sec_plus_logo.png";

export default ({ oppositeTheme, darkMode, setDarkMode }) => {
  return (
    <div>
      <div className="header">
        <div className="header-left">
          <div className="header-info">
            <h1 className="header-name">Ryan Gibbon</h1>
            <h3 className="header-title">IT Intern</h3>
          </div>
          <img
            className="sec-logo"
            src={sec_logo}
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
              href="mailto:ryan@gibbontechnology.ca"
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
