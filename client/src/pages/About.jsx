import IMG from "../../src/assets/ryan.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function About() {
  return (
    <div
      style={{
        borderRadius: "20px",
        padding: "20px 0",
        minHeight: "100%",
        width: "95%",
        maxWidth: "600px",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="text-center mb-5 w-100">
        <h2
          style={{
            backgroundColor: "black",
            margin: "20px 0",
            padding: "2rem",
            width: "100%",
            borderRadius: "10px",
          }}
        >
          Dive deeper into my story
          <a href="https://about.redrocksoftware.ca">
            <button
              className="btn btn-primary btn-lg"
              style={{ width: "100%", marginTop: "20px" }}
            >
              HERE
            </button>
          </a>
        </h2>
      </div>

      <h2
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "50px",
        }}
      >
        My background
      </h2>
      <LazyLoadImage
        src={IMG}
        placeholderSrc={IMG}
        effect="blur"
        alt="Ryan"
        style={{
          borderRadius: "20px",
          width: "90%",
          maxWidth: "375px",
          display: "block",
          margin: "0 auto",
        }}
      />
      <p style={{ margin: "50px 10px 200px 10px", fontSize: "1.5rem" }}>
        I started my career in the trades working as a marine mechanic in a
        small town on beautiful Georgian Bay. After serveral years at a local
        marina, I decided to try carpentry, where I enjoyed serveral years
        building and renovating cottages on the bay.
        <br />
        <br />
        Once the pandemic hit, I found myself with a lot more free time. One
        evening I stumbled upon a Python tutorial. After a quick installation of
        PyCharm and writing a very simple 'Hello World' program, I was hooked.
        <br />
        <br />I finished my first year of Software Engineering at Centennial
        College with a 4.2GPA. While looking into job opportunities I realized
        the content I was learning was slightly outdated. By utilizing resources
        like FreeCodeCamp, Udemy and language/framework specific documentation,
        I focused my learning on technologies and languages that job
        opportunities are asking for, with the only investment being my time.
        <br />
        <br />
        Throughout the last three years I have been focusing on learning new
        languages, frameworks and technologies. Whenever I have free time, I am
        at my computer writting code and building apps.
        <br />
        <br />I specialize in building Node.js backends, as well as React
        frontends. Javascript is without a doubt my favourite language.
      </p>
    </div>
  );
}
