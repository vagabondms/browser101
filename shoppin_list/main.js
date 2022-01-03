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
  console.log(promise);
  const resolved = await promise;

  alerts.removeChild(resolved);
};

const activateAlert = () => {
  const newAlert = document.createElement("div");
  newAlert.setAttribute("class", "alert");
  newAlert.innerText = "추가되었습니다.";
  alerts.append(newAlert);
  asyncAlert(newAlert);
};

const getInputValue = () => input.value;

const deleteInputValue = () => {
  input.value = "";
};

const addToLists = (item) => {
  if (!item) {
    return;
  }
  const newList = document.createElement("div");

  const bin = document.createElement("i");

  newList.setAttribute("class", "list");
  bin.setAttribute("class", "button btn--delete fas fa-trash");
  bin.addEventListener("click", (e) => {
    const targetList = e.target.parentNode;
    lists.removeChild(targetList);
  });
  newList.innerText = item;
  newList.appendChild(bin);
  lists.appendChild(newList);
  activateAlert();
};

input.addEventListener("keypress", (e) => {
  const { key } = e;

  if (key === "Enter") {
    addToLists(getInputValue());
    deleteInputValue();
    return;
  }
});

addBtn.addEventListener("click", (e) => {
  addToLists(getInputValue());
  deleteInputValue();
});
