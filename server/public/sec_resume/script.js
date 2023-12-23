// set initial mode --> dark or light
const initial_mode = "dark";

// variable that will change
let color_mode = initial_mode;

const modeInfo = document.querySelector(".header-right");
const staticContainer = document.querySelector(".static-container");
const dynamicContainer = document.querySelector(".dynamic-container");
const seperator = document.querySelector(".seperator");
const vertRule = document.querySelectorAll(".vert-rule");

const toggleMode = (mode) => {
  // change to dark mode
  if (mode === "dark") {
    color_mode = "light";
    modeInfo.textContent = "Toggle light mode";
    vertRule.forEach((rule) => {
      rule.classList.add("vert-rule-dark");
      rule.classList.remove("vert-rule-light");
    });
    modeInfo.classList.add("header-right-dark");
    modeInfo.classList.remove("header-right-light");
    staticContainer.classList.add("static-dark");
    staticContainer.classList.remove("static-light");
    dynamicContainer.classList.add("dynamic-dark");
    dynamicContainer.classList.remove("dynamic-light");
    seperator.classList.add("sep-dark");
    seperator.classList.remove("sep-light");
  } else {
    // change to light mode
    color_mode = "dark";
    modeInfo.textContent = "Toggle dark mode";
    vertRule.forEach((rule) => {
      rule.classList.add("vert-rule-light");
      rule.classList.remove("vert-rule-dark");
    });
    modeInfo.classList.add("header-right-light");
    modeInfo.classList.remove("header-right-dark");
    staticContainer.classList.add("static-light");
    staticContainer.classList.remove("static-dark");
    dynamicContainer.classList.add("dynamic-light");
    dynamicContainer.classList.remove("dynamic-dark");
    seperator.classList.add("sep-light");
    seperator.classList.remove("sep-dark");
  }
};

document.onload = toggleMode(initial_mode);

modeInfo.addEventListener("click", () => toggleMode(color_mode));
