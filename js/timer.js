window.addEventListener("load", () => {
  const days = document.querySelector(".days");
  const hours = document.querySelector(".hours");
  const minutes = document.querySelector(".minutes");
  const seconds = document.querySelector(".seconds");

  let timepassed = {
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  };

  let totalSeconds;

  function init() {
    let interval = setInterval(() => {
      const currentDay = new Date();
      const firstDay = new Date("2022-08-08");

      const toNow = currentDay.getTime();
      const toFirst = firstDay.getTime();

      const passedTime = new Date(toNow - toFirst);

      totalSeconds = Math.floor(passedTime / 1000);
      settimepassed();
      countTime();
    }, 1000);
  }

  function countTime() {
    timepassed.s--;
    if (timepassed.m >= 0 && timepassed.s < 0) {
      timepassed.s = 59;
      timepassed.m--;
      if (timepassed.h >= 0 && timepassed.m < 0) {
        timepassed.m = 59;
        timepassed.h--;
        if (timepassed.d >= 0 && timepassed.h < 0) {
          timepassed.h = 23;
          timepassed.d--;
        }
      }
    }
    --totalSeconds;
    printTime();
  }

  function printTime() {
    animateFlip(days, timepassed.d);
    animateFlip(hours, timepassed.h);
    animateFlip(minutes, timepassed.m);
    animateFlip(seconds, timepassed.s);
  }

  function animateFlip(element, value) {
    const valueInDom = element.querySelector(".bottom-back").innerText;
    const currentValue = value < 10 ? "0" + value : "" + value;

    if (valueInDom === currentValue) return;

    element.querySelector(".top-back span").innerText = currentValue;
    element.querySelector(".bottom-back span").innerText = currentValue;

    gsap.to(element.querySelector(".top"), 0.7, {
      rotationX: "-180deg",
      transformPerspective: 300,
      ease: Quart.easeOut,
      onComplete: function () {
        element.querySelector(".top").innerText = currentValue;
        element.querySelector(".bottom").innerText = currentValue;
        gsap.set(element.querySelector(".top"), { rotationX: 0 });
      },
    });

    gsap.to(element.querySelector(".top-back"), 0.7, {
      rotationX: 0,
      transformPerspective: 300,
      ease: Quart.easeOut,
      clearProps: "all",
    });
  }

  function settimepassed() {
    timepassed.d = Math.floor(totalSeconds / (60 * 60 * 24));
    timepassed.h = Math.floor((totalSeconds / (60 * 60)) % 24);
    timepassed.m = Math.floor((totalSeconds / 60) % 60);
    timepassed.s = Math.floor(totalSeconds % 60);
  }

  init();
});
