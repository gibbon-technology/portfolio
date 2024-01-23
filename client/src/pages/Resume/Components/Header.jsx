import sec_logo from "../../../assets/logos/sec_plus_logo.png";

export default ({ oppositeTheme, darkMode, setDarkMode }) => {
  const color1 = "#032631";
  const color2 = "#c6e0e9";
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
          <a
            className="header-right"
            style={{
              ...oppositeTheme,
              marginRight: "10px",
              textDecoration: "none",
              textAlign: "center",
            }}
            href="mailto:ryan@gibbontechnology.ca"
          >
            Contact
          </a>

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
