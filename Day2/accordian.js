let buttons = document.querySelectorAll(".header-button");
let key = sessionStorage.getItem("openat");
console.log(key);
if (key != null && key >= 0) {
  const panel = buttons[key].nextElementSibling;
  panel.classList.add("active");
  buttons[key].setAttribute("aria-expanded", "true");
}
buttons.forEach((button, index) => {
  button.addEventListener("click", function (event) {
    let panel = this.nextElementSibling;
    console.log(index);
    panel.classList.toggle("active");
    const isopen = panel.classList.contains("active");
    this.setAttribute("aria-expanded", isopen);
    if (isopen) {
      sessionStorage.setItem("openat", index);
      console.log(`stored ${sessionStorage.getItem("openat")}`);
    } else sessionStorage.removeItem("openat");
    console.log(panel);
    console.log(buttons.length);
    for (let i = 0; i < buttons.length; i++) {
      if (i != index) {
        buttons[i].setAttribute("aria-expanded", "false");
        let body = buttons[i].nextElementSibling;
        body.classList.remove("active");
      }
    }
  });
  button.addEventListener("keydown", (event) => {
    console.log(event.key);
    let nextind = 0;
    if (event.key == "ArrowDown") {
      event.preventDefault();
      nextind = (index + 1) % buttons.length;
      buttons[nextind].focus();
    } else if (event.key == "ArrowUp") {
      event.preventDefault();
      if (index == 0) nextind = buttons.length - 1;
      else nextind = index - 1;
      buttons[nextind].focus();
    } else if (event.key == "Home") {
      event.preventDefault();
      buttons[0].focus();
    } else if (event.key == "End") {
      event.preventDefault();
      buttons[buttons.length - 1].focus();
    }
  });
});
