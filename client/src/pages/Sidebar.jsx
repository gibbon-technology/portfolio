import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../assets/logos/gibbon_logo.png";
import logo_notext from "../assets/logos/logo_dark_notext.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Sidebar({ alert }) {
  const { pathname } = useLocation();
  const [adminActive, setAdminActive] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const basePages = ["/", "/skills", "/about", "/weather"];
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 500;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    if (!basePages.includes(pathname)) {
      setAdminActive(true);
    } else setAdminActive(false);
  }, [pathname]);

  const color1 = "#032631";
  const color2 = "#c6e0e9";

  const linkStyles = ({ isActive }) => ({
    padding: "20px",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "1.5rem",
    backgroundColor: isActive ? color2 : color1,
    color: isActive ? color1 : color2,
  });

  const adminStyles = {
    padding: "20px",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "1.5rem",
    backgroundColor: adminActive ? color2 : color1,
    color: adminActive ? color1 : color2,
  };
  const small_styles = {
    width: "95%",
    textAlign: "center",
    fontSize: "1.4rem",
    fontWeight: 700,
    color: color2,
    margin: "15px auto",
    border: `2px solid ${color2}`,
    borderRadius: "10px",
    padding: "15px 0",
    textDecoration: "none",
  };

  const large_nav = (
    <div
      style={{
        minHeight: "10vh",
        width: "100%",
        maxWidth: "600px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/">
        <img src={logo} width="100px" />
      </Link>

      <NavLink to="/about" style={linkStyles}>
        About
      </NavLink>
      <NavLink to="/skills" style={linkStyles}>
        Skills
      </NavLink>
      <NavLink to="/weather" style={linkStyles}>
        Weather
      </NavLink>
      <NavLink to="/dashboard" style={adminStyles}>
        Admin
      </NavLink>
    </div>
  );

  const small_nav = (
    <Navbar expand="lg" style={{ width: "100%" }} expanded={expanded}>
      <Container>
        <Navbar.Brand
          style={{ fontSize: "1.4rem", fontWeight: "700", color: color2 }}
        >
          <NavLink
            to="/"
            style={{ textDecoration: "none", color: color2 }}
            onClick={() => setExpanded(false)}
          >
            <img src={logo_notext} height="50px" style={{ height: "60px" }} />
            Redrock Software
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setExpanded(expanded ? false : "expanded")}
          aria-controls="basic-navbar-nav"
          style={{ backgroundColor: color2, padding: "0.5rem 1.5rem" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/about"
              style={small_styles}
              onClick={() => setExpanded(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/skills"
              style={small_styles}
              onClick={() => setExpanded(false)}
            >
              Skills
            </NavLink>
            <NavLink
              to="/weather"
              style={small_styles}
              onClick={() => setExpanded(false)}
            >
              Weather
            </NavLink>
            <NavLink
              to="/dashboard"
              style={small_styles}
              onClick={() => setExpanded(false)}
            >
              Admin
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  return (
    <div
      style={{
        minWidth: "350px",
        minHeight: "10vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color1,
      }}
    >
      {width < breakpoint ? small_nav : large_nav}
    </div>
  );
}
