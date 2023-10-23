import mongodb from "../assets/skill_logos/mongodb.svg";
import python from "../assets/skill_logos/python.svg";
import javascript from "../assets/skill_logos/javascript.svg";
import nginx from "../assets/skill_logos/nginx.svg";
import nodejs from "../assets/skill_logos/nodejs.svg";
import react from "../assets/skill_logos/react.svg";
import html from "../assets/skill_logos/html.svg";
import css from "../assets/skill_logos/css.svg";
import csharp from "../assets/skill_logos/csharp.svg";

export default function Skills() {
  const imgStyle = {
    width: "75px",
    margin: "20px",
  };

  return (
    <div
      style={{
        borderRadius: "20px",
        padding: "20px",
        height: "100%",
        width: "100%",
        maxWidth: "600px",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "50px",
        }}
      >
        Skills
      </h2>

      <div>
        <h2 style={{ textAlign: "center" }}>Languages</h2>
        <img src={python} alt="Python logo" style={imgStyle} />
        <img src={javascript} alt="Javascript logo" style={imgStyle} />
        <img src={csharp} alt="React logo" style={imgStyle} />
      </div>

      <div>
        <h2 style={{ textAlign: "center" }}>Frontend</h2>
        <img src={react} alt="React logo" style={imgStyle} />
        <img src={html} alt="React logo" style={imgStyle} />
        <img src={css} alt="React logo" style={imgStyle} />
      </div>

      <div style={{ marginBottom: "100px" }}>
        <h2 style={{ textAlign: "center" }}>Backend/DB</h2>
        <img src={nodejs} alt="NodeJS logo" style={imgStyle} />
        <img src={mongodb} alt="MongoDB logo" style={imgStyle} />
        <img src={nginx} alt="NGINX logo" style={imgStyle} />
      </div>

      <div>
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "50px",
            textAlign: "center",
          }}
        >
          Additional information:
        </h2>
        <p style={{ fontSize: "1.3rem", marginBottom: "200px" }}>
          I created this website from scratch with the frontend built with
          React, and the backend with NodeJS. I have NGINX configured as a
          reverse proxy. I have a Digital Ocean droplet that I manage myself,
          complete with a custom domain and SSL certificate, thanks to CertBot.
          <br />
          <br />
          I spend a large amount of time working on different aspects of the
          development process, from frontend to backend, configuring and
          maintaining my Ubuntu server and automating tasks with Cron. I like to
          diversify my knowledge so I can be a well rounded developer.
          <br />
          <br />
          I use Git to manage my code and Github to hold my repos in the cloud.
          Once I make changes to my code on my dev computer and push the
          changes, I have a script that will SSH into my production server, pull
          the changes and restart the server, automatically. I have streamlined
          the process to the best of my ability, making changes to production
          code as simple as saving and pushing new changes from VSCode.
          <br />
          <br />I am very comfortable working in all operating systems, and I
          have a very good knowledge of Linux (Ubuntu), the Linux command line,
          SSH, configuration, and more.
        </p>
      </div>
    </div>
  );
}
