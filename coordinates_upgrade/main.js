const target = document.querySelector(".target");
const coordination = document.querySelector(".coordination");
const xLine = document.querySelector(".xAxis");
const yLine = document.querySelector(".yAxis");

addEventListener("load", () => {
  const targetRect = target.getBoundingClientRect();
  const width = targetRect.width / 2;
  const height = targetRect.height / 2;
  document.addEventListener("mousemove", (e) => {
    const { style: targetStyle } = target;
    const { style: coordinationStyle } = coordination;
    const { clientX, clientY } = e;

    targetStyle.transform = `translate(${clientX - height}px,${
      clientY - width
    }px)`;
    coordinationStyle.transform = `translate(${clientX}px,${clientY}px)`;

    coordination.innerHTML = `${clientX}px, ${clientY}px`;

    yLine.style.transform = `translateX(${clientX}px)`;
    xLine.style.transform = `translateY(${clientY}px)`;
  });

  coordination.innerHTML = `${window.innerWidth * 0.5}px, ${
    window.innerHeight * 0.5
  }px`;
});
