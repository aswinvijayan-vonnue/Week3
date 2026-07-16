import { addData, deleteData, getAllData, init } from "./handleData.js";
import "./handleData.js";
let container = document.querySelector(".container");

const tables = ["todo", "inProgress", "completed"];
init().then(async (resolve) => {
  for (let table of tables) {
    getAllData(table).then((datas) => {
      console.log(table);
      console.log(datas);
      const mainDiv = document.querySelector(`#${table}`);
      for (let data of datas) {
        const card = renderCards(data.id, data.val);
        card.setAttribute("pid", table);
        console.log(card);
        mainDiv.append(card);
      }
    });
  
  }
});

// rendering();

// let containerhtml=localStorage.getItem("container");
// // console.log(containerhtml===null);
// if(containerhtml!==null){
//    container.innerHTML=containerhtml;
// }else{
//      localStorage.setItem("container",container.innerHTML);

// }

let draggableElements = document.querySelectorAll(".task");
let dropableElements = document.querySelectorAll(".box");
draggableElements.forEach((task) => {
  task.addEventListener("dragstart", (e) => {
    task.classList.add("is-dragging");
    console.log(task);
    const cardid = task.id;
    console.log(task.id);
    console.log("here", cardid);
    e.dataTransfer.setData("text/plain", cardid);
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
  task.addEventListener("keydown", handleKeyboard);
});
dropableElements.forEach((area) => {
  area.addEventListener("dragover", (e) => {
    e.preventDefault();
    // let curtask=container.querySelector("is-dragging");
    // area.appendChild(curtask);
  });
  area.addEventListener("dragenter", (e) => {
    e.preventDefault();
    e.target.closest(".box").classList.add("is-over");
  });
  area.addEventListener("dragleave", (e) => {
    e.preventDefault();
    // if(area.contains(e.relatedtarget))
    if (!area.contains(e.relatedTarget)) {
      e.target.closest(".box").classList.remove("is-over");
    }
  });
  area.addEventListener("drop", (e) => {
    e.preventDefault();
    console.log("dropped at", e.target.closest(".box"));
    e.target.closest(".box").classList.remove("is-over");
    const droppedcard = e.dataTransfer.getData("text/plain");
    const card = e.target;
    console.log("this is ", card);
    let curtask = document.getElementById(droppedcard);
    const textVal = curtask.querySelector("span").textContent;
    console.log("hello", textVal);
    const data = {
      id: curtask.id,
      val: textVal,
    };
    const parentBox = curtask.getAttribute("pid");
    curtask.setAttribute("pid", card.id);
    // console.log
    const boxes = [...dropableElements];
    console.log("dropped at index", boxes.indexOf(card));
    switch (boxes.indexOf(card)) {
      case 0:
        addData("todo", data);
        break;
      case 1:
        addData("inProgress", data);
        break;
      case 2:
        addData("completed", data);
        break;
    }

    deleteData(parentBox, curtask.id);
    console.log("hlo", curtask.getAttribute("pid"));
    e.target.closest(".box").appendChild(curtask);
    // localStorage.setItem("container",container.innerHTML);
  });
  area.addEventListener("keydown", handleKeyboard);
});
let currtask = null;
function handleKeyboard(e) {
  e.stopPropagation();
  const boxes = [...dropableElements];
  const tasks = [...draggableElements];
  let boxindex;
  console.log(e.key);
  switch (e.key) {
    case " ":
      if (tasks.includes(document.activeElement)) {
        console.log("space entered");
        currtask = document.activeElement.closest(".task");
        console.log(currtask);
        currtask.classList.add("picked");
        // if(tasks.includes(e.target)){
        //     currtask=e.target;

        // }
      } else if (boxes.includes(document.activeElement)) {
        console.log(currtask);
        console.log(currtask !== null);
        if (currtask !== null) {
          console.log(currtask);
          currtask.classList.remove("picked");
          let unit = document.activeElement.closest(".box");
          console.log(unit);
          unit.appendChild(currtask);
          currtask = null;
          localStorage.setItem("container", container.innerHTML);
        } else {
          console.log("null currtask");
        }
      }

      // if(currtask)

      break;
    case "ArrowRight":
      boxindex = boxes.indexOf(document.activeElement.closest(".box"));
      boxindex = (boxindex + 1) % boxes.length;
      boxes[boxindex].focus();
      break;
    case "ArrowLeft":
      boxindex = boxes.indexOf(document.activeElement.closest(".box"));
      boxindex = (boxindex - 1 + boxes.length) % boxes.length;
      boxes[boxindex].focus();
      break;
  }
}
let removeButtons = document.querySelectorAll(".cross");
const todoBox = dropableElements[0];
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let val = document.getElementById("task-input").value;
  console.log(val);
  val = val.trim();
  if (val !== "") {
    const newTask = document.createElement("div");
    newTask.id = `task-${Date.now()}`;
    const dataToAdd = {
      id: newTask.id,
      val: val,
    };
    addData("todo", dataToAdd);

    newTask.classList.add("task");
    newTask.setAttribute("pid", "todo");
    const spanelement = document.createElement("span");
    const buttonElement = document.createElement("button");
    spanelement.textContent = val;
    buttonElement.classList.add("cross");
    buttonElement.textContent = "x";
    newTask.setAttribute("tabindex", "0");
    newTask.setAttribute("draggable", "true");
    newTask.appendChild(spanelement);
    newTask.appendChild(buttonElement);
    buttonElement.addEventListener("click", remove);
    todoBox.appendChild(newTask);
    draggableElements = document.querySelectorAll(".task");
    newTask.addEventListener("dragstart", (e) => {
      newTask.classList.add("is-dragging");
      const newCardid = newTask.id;
      e.dataTransfer.setData("text/plain", newCardid);
    });
    newTask.addEventListener("dragend", (e) => {
      newTask.classList.remove("is-dragging");
    });
    // localStorage.setItem("container",container.innerHTML);
  }
  document.getElementById("task-input").value = "";
});

function remove(event) {
  const test = event.target.closest(".task");
  const container = event.target.closest(".box");
  const containerArray = Array.from(dropableElements);
  console.log(containerArray.indexOf(container));
  switch (containerArray.indexOf(container)) {
    case 0:
      deleteData("todo", test.id);
      break;
    case 1:
      deleteData("inProgress", test.id);
      break;
    case 2:
      deleteData("completed", test.id);
      break;
  }
  console.log(test);
  if (test) {
    test.remove();
  }
  draggableElements = document.querySelectorAll(".task");
  //  localStorage.setItem("container",container.innerHTML);
}
removeButtons.forEach((button) => {
  button.addEventListener("click", remove);
});

function renderCards(id, val) {
  const newTask = document.createElement("div");
  newTask.id = id;
  newTask.classList.add("task");
  const spanelement = document.createElement("span");
  const buttonElement = document.createElement("button");
  spanelement.textContent = val;
  buttonElement.classList.add("cross");
  buttonElement.textContent = "x";
  newTask.setAttribute("tabindex", "0");
  newTask.setAttribute("draggable", "true");
  newTask.appendChild(spanelement);
  newTask.appendChild(buttonElement);
  buttonElement.addEventListener("click", remove);
  //   draggableElements = document.querySelectorAll(".task");
  newTask.addEventListener("dragstart", (e) => {
    newTask.classList.add("is-dragging");
    const newCardid = newTask.id;
    e.dataTransfer.setData("text/plain", newCardid);
  });
  newTask.addEventListener("dragend", (e) => {
    newTask.classList.remove("is-dragging");
  });
  return newTask;
}

window.addEventListener("online", (event) => {
    for(let table of tables){
         getAllData(table).then((datas)=>{
            fetch("https://jsonplaceholder.typicode.com/posts",{method: "POST", body: JSON.stringify(datas)})
            .then((response)=>response.json())
            .then((res)=>console.log(res));
         })
    }
});
