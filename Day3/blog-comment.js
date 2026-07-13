const articles = document.querySelectorAll(".article");
console.log(articles);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visibile");
      else entry.target.classList.remove("visibile");
    });
  },
  {
    threshold: 0.2,
  },
);
articles.forEach((article) => {
  observer.observe(article);
});
function progressUpdate() {
  const but = document.querySelector(".back-to-top");
  const scrolltop = window.scrollY;
  console.log(scrolltop);
  if (scrolltop >= 300) but.classList.add("back-button");
  else but.classList.remove("back-button");

  const documentheight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  console.log(`document height is ${documentheight}`);
  if (documentheight <= 0) return;
  const bar = document.querySelector(".scrollbar");
  const width = (scrolltop / documentheight) * 100;
  console.log(`Scrolled ${width}%`);
  bar.style.width = `${width}%`;
}
window.addEventListener("scroll", (event) => {
  requestAnimationFrame(progressUpdate);
});
function moveTop(event) {
  console.log(event.target);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
const blogContainer = document.querySelector(".blog");
const mutationObserver = new MutationObserver((entries) => {
  entries.forEach((entry) => {
    entry.addedNodes.forEach((node) => observer.observe(node));
  });
});
mutationObserver.observe(blogContainer, { childList: true });

function newArticle() {
  const articleEle = document.createElement("article");
  const h2 = document.createElement("h2");
  const section = document.createElement("section");
  const ptag1 = document.createElement("p");
  const footer = document.createElement("footer");
  const pfooter = document.createElement("p");
  h2.textContent = "New Article";
  ptag1.textContent =
    "Our past is available for imaginative construction. If our ancestors were given different goals and dice rolls, we would have a different present. We need not only speculate on future hypotheses, we can also counterfactually think through alternative histories. For instance, 'what would our present be like if the Cuban missile crisis hadn't happened?' These imagined realities are possible worlds: worlds which are coherent and logically sensible but just so happen to not be the actual world we find ourselves in.";
  pfooter.textContent = "Greta Latchford";
  footer.appendChild(pfooter);
  section.appendChild(ptag1);
  articleEle.appendChild(h2);
  articleEle.appendChild(section);
  articleEle.appendChild(footer);
  articleEle.className = "article";
  console.log(articleEle);
  blogContainer.appendChild(articleEle);
}
newArticle();

const floatingContainer = document.querySelector(".floating-container");
const desc = document.querySelector(".floating-description");
const DOMchangeObserver = new MutationObserver((entries) => {
  entries.forEach((mutation) => {
    console.log("target",mutation.target);
     if (floatingContainer.contains(mutation.target)) {
      console.log("again sorry");
      return; 
    }
    if (mutation.type === "childList") {
      console.log(mutation);
      if (mutation.addedNodes.length > 0) {
        desc.textContent="Element added: A new child node was inserted."
      }
      if (mutation.removedNodes.length > 0) {
        desc.textContent="Element removed: A child node was deleted."
      }
      floatingContainer.classList.add("floating-container-visible");
    }
    else if (mutation.type === "attributes") {
      console.log("here",mutation);
      desc.textContent = "Atrributes changed";
      floatingContainer.classList.add("floating-container-visible");
    }
  });
});
DOMchangeObserver.observe(document.body, {
  childList: true,
  attributes: true,
  subtree: true,
  attributeFilter: ["aria-pressed"]
});
// const newDiv=document.createElement('div');
// const newSpan=document.createElement('span');
// newSpan.textContent="This is new span";
// newDiv.appendChild(newSpan);
// document.body.appendChild(newDiv);
document.querySelector('.floating-panel button').addEventListener('click',()=>{
  floatingContainer.classList.remove('floating-container-visible');
});
// document.querySelector('.scrollbar-container').remove();
document.querySelector('.backto-top-container').setAttribute('aria-pressed',"false");
const newDiv=document.createElement('div');
const newSpan=document.createElement('span');
newSpan.textContent="This is new span";
newDiv.appendChild(newSpan);
blogContainer.appendChild(newDiv);
