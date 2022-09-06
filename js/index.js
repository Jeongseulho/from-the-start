const buttons = document.querySelectorAll(".buttoncontainer > button");

buttons.forEach((button, index) =>
  button.addEventListener(
    "click",
    () =>
      (document.querySelector("main").style.transform = `translate(${
        -index * 100
      }vw)`)
  )
);
