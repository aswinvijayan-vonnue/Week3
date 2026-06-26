const sections = document.querySelectorAll(".section");
const container = document.querySelector(".container");
let enlargedimg = document.querySelector(".enlargedImg");
let galleryState = {
  allImgs: [],
  currentIndex: null,
};

sections.forEach((section) => {
  section.addEventListener("click", (e) => {
    if (e.target.nodeName === "IMG") {
      console.log(e.target.nodeName == "IMG");
      const imgs = Array.from(section.querySelectorAll("img"));
      let url = e.target.getAttribute("src");
      enlargedimg.setAttribute("src", url);
      container.classList.add("container-visible");
      document.body.classList.add("scroll-lock");
      console.log(enlargedimg);
      galleryState.currentIndex = imgs.indexOf(e.target);
      galleryState.allImgs = imgs;
    }
    // console.log(imgs);
  });
});

// return "hello";

function nextimg() {
  let arr = galleryState.allImgs;
  let ind = galleryState.currentIndex;
  console.log(`arr at ind ${ind}`);
  console.log(arr);
  if (arr !== []) {
    ind = ind === arr.length - 1 ? 0 : ind + 1;
    let image = arr[ind];
    let url = image.getAttribute("src");
    console.log(url);
    enlargedimg.setAttribute("src", url);
    galleryState.currentIndex = ind;
  }
}
function previmg() {
  let arr = galleryState.allImgs;
  let ind = galleryState.currentIndex;
  if (arr !== []) {
    ind = ind === 0 ? arr.length - 1 : ind - 1;
    let image = arr[ind];
    let url = image.getAttribute("src");
    enlargedimg.setAttribute("src", url);
    galleryState.currentIndex = ind;
  }
}
function closeimg() {
  const isopen = container.classList.contains("container-visible");
  if (isopen){ container.classList.remove("container-visible");
    document.body.classList.remove("scroll-lock");
  }
}

document.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key==="Tab") {
    const prev=document.querySelector(".prev");
    const next=document.querySelector(".next");
    const close=document.querySelector(".close-but");
    if(e.shiftKey){
        if(document.activeElement===prev){
            close.focus();
            e.preventDefault();
        }
    }
    if(document.activeElement===close){
        prev.focus();
        e.preventDefault();
    }
  } else if (e.key === "Escape") {
    closeimg();
  } else if (e.key === "ArrowRight") nextimg();
  else if (e.key === "ArrowLeft") previmg();
});
let startX;
container.addEventListener('touchstart',(event)=>{
    console.log("Touch started");
    startX=event.changedTouches[0].screenX
});
container.addEventListener('touchend',(event)=>{
    console.log("touch ended");
    let endX=event.changedTouches[0].screenX;
    let diff=endX-startX;
    let threshold=30;
    if(diff>threshold) nextimg();
    if(diff<-threshold) previmg();
    
})