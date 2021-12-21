"use strict";

const screen = document.querySelector(".screen__value");
const outer = document.querySelector(".outer__value");
const inner = document.querySelector(".inner__value");
const client = document.querySelector(".client-width__value");

const handleWindowResize = () => {
  const {
    screen: { width, height },
    outerHeight,
    outerWidth,
    innerHeight,
    innerWidth,
  } = window;

  const { clientWidth, clientHeight } = document.documentElement;

  screen.innerText = `${width}, ${height}`;
  outer.innerText = `${outerWidth}, ${outerHeight}`;
  inner.innerText = `${innerWidth}, ${innerHeight}`;
  client.innerText = `${clientWidth}, ${clientHeight}`;
};
window.addEventListener("resize", handleWindowResize);
handleWindowResize();
