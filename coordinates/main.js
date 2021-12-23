const target = document.querySelector(".target");
const coordination = document.querySelector(".coordination");
const xLine = document.querySelector(".xAxis");
const yLine = document.querySelector(".yAxis");
window.addEventListener("mousemove", (e) => {
  const { style: targetStyle } = target;
  const { style: coordinationStyle } = coordination;

  const { clientX, clientY } = e;

  const yAxis = clientY + "px";
  const xAxis = clientX + "px";

  targetStyle.top = yAxis;
  targetStyle.left = xAxis;

  coordination.innerHTML = `${xAxis}, ${yAxis}`;
  coordinationStyle.top = yAxis;
  coordinationStyle.left = xAxis;

  yLine.style.left = xAxis;
  xLine.style.top = yAxis;
});

coordination.innerHTML = `${window.innerWidth * 0.5}px, ${
  window.innerHeight * 0.5
}px`;
