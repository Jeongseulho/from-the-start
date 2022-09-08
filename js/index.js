const buttons = document.querySelectorAll(".buttoncontainer > button");
const langbutton = document.querySelector(".buttoncontainer > .lang-button");
const lang = document.querySelector(".lang");

buttons.forEach((button, index) =>
  button.addEventListener(
    "click",
    () =>
      (document.querySelector("main").style.transform = `translate(${
        -index * 100
      }vw)`)
  )
);
