import "./App.css";
import { useState } from "react";
import Header from "./Components/Header.jsx";
import Banner from "./Components/Banner.jsx";
import Skills from "./Components/Skills.jsx";

function App() {
  const light_color = "#c6e0e9";
  const dark_color = "#032631";

  const bannerText =
    "Currently studying for INE Security's Junior Penetration Tester";

  const [darkMode, setDarkMode] = useState(true);

  const dark_styles = { color: light_color, backgroundColor: dark_color };
  const light_styles = { color: dark_color, backgroundColor: light_color };

  const currentStyle = darkMode ? dark_styles : light_styles;
  const oppositeColorTheme = darkMode ? light_styles : dark_styles;

  return (
    <div className="static-container">
      <div className="dynamic-container" style={currentStyle}>
        <Header
          oppositeTheme={oppositeColorTheme}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <hr className="seperator" style={oppositeColorTheme} />

        <Banner bannerText={bannerText} />
        <Skills />
      </div>
    </div>
  );
}

export default App;
