const input = document.querySelector(".input");
const addBtn = document.querySelector(".btn--add");
const deleteBtn = document.querySelector(".btn--delete");
const lists = document.querySelector(".lists");
const alerts = document.querySelector(".alerts");

const asyncAlert = async (node) => {
  node.classList.add("active");
  const promise = new Promise((res) => {
    setTimeout(() => {
      node.classList.remove("active");
      res(node);
    }, 2000);
  });

  const resolved = await promise;

  alerts.removeChild(resolved);
};

const createAlert = () => {
  const newAlert = document.createElement("div");
  newAlert.setAttribute("class", "alert");
  newAlert.innerText = "추가되었습니다.";
  return newAlert;
};

const activateAlert = () => {
  const newAlert = createAlert();
  alerts.append(newAlert);
  asyncAlert(newAlert);
};

const getInputValue = () => input.value;

const deleteInputValue = () => {
  input.value = "";
};

const createList = (inputValue) => {
  const newList = document.createElement("div");
  const bin = document.createElement("i");

  newList.setAttribute("class", "list");
  bin.setAttribute("class", "button btn--delete fas fa-trash");
  bin.addEventListener("click", () => {
    lists.removeChild(newList);
  });

  newList.innerText = inputValue;
  newList.appendChild(bin);
  return newList;
};

const addToLists = (inputValue) => {
  if (!inputValue) {
    return;
  }
  const newList = createList(inputValue);
  lists.appendChild(newList);
  newList.scrollIntoView();
  activateAlert();
};

input.addEventListener("keypress", (e) => {
  const { key } = e;

  if (key === "Enter") {
    const inputValue = getInputValue();
    addToLists(inputValue);
    deleteInputValue();
    return;
  }
});

addBtn.addEventListener("click", (e) => {
  const inputValue = getInputValue();
  addToLists(inputValue);
  deleteInputValue();
  input.focus();
});
