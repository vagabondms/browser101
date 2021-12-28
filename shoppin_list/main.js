const input = document.querySelector(".input");
const addBtn = document.querySelector(".btn--add");
const deleteBtn = document.querySelector(".btn--delete");
const lists = document.querySelector(".lists");
const alerts = document.querySelector(".alerts");
const activate = document.querySelector(".activate");

const asyncAlert = (node) => {
  node.classList.add("active");
  const promise = new Promise((res) => {
    setTimeout(() => {
      node.classList.remove("active");
      res(node);
    }, 2000);
  });
  promise.then((node) => {
    alerts.removeChild(node);
  });
};

const activateAlert = () => {
  const div = document.createElement("div");
  div.setAttribute("class", "alert");
  div.innerText = "추가되었습니다.";
  alerts.prepend(div);
  asyncAlert(div);
};

const getInputValue = () => input.value;

const deleteInputValue = () => {
  input.value = "";
};

const addToList = (item) => {
  if (!item) {
    return;
  }
  const div = document.createElement("div");
  const img = document.createElement("img");

  div.setAttribute("class", "list");
  img.setAttribute("class", "button btn--delete");
  img.setAttribute("src", "bin.png");
  img.addEventListener("click", (e) => {
    const list = e.target.parentNode;
    lists.removeChild(list);
  });
  div.innerText = item;
  div.appendChild(img);
  lists.appendChild(div);
  activateAlert();
};

input.addEventListener("keypress", (e) => {
  const { key } = e;

  if (key === "Enter") {
    addToList(getInputValue());
    deleteInputValue();
    return;
  }
});

addBtn.addEventListener("click", (e) => {
  addToList(getInputValue());
  deleteInputValue();
});
