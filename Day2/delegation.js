const ulParent = document.querySelector("#todo-list");
ulParent.addEventListener("click", (event) => {
  if (event.target.matches(["input[type='checkbox']"])) {
    if (event.target.checked) {
      let text = event.target.nextSibling;
      text.style.textDecoration = "line-through";
    } else {
      let text = event.target.nextSibling;
      text.style.textDecoration = "none";
    }
  } else if (event.target.matches("button")) {
    let parent = event.target.closest("li");
    parent.remove();
  } else if (event.target.matches("span")) {
    event.target.setAttribute("contenteditable", "true");
  }
});
function addItem() {
  const newli = document.createElement("li");
  const check = document.createElement("input");
  check.type = "checkbox";
  const spanele = document.createElement("span");
  spanele.textContent = "Type your task...";
  const del = document.createElement("button");
  del.textContent = "Delete";
  newli.append(check, spanele, del);
  ulParent.append(newli);
}
