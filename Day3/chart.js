console.log("hello");
const dummyVals = [
  { id: 1, val: 200 },
  { id: 2, val: 100 },
  { id: 3, val: 350 },
  { id: 4, val: 50 },
];
const maxVal=Math.max(...dummyVals.map(item=>item.val));
const container = document.querySelector(".chart-container");
// function drawChart() {
//   dummyVals.forEach((chartVal) => {
//     const div = document.createElement("div");
//     div.id = chartVal.id;
//     div.className = "barChart";
//     let height = (chartVal.val / 400) * 829;
//     div.style.height = `${height}px`;
//     container.appendChild(div);
//   });
// }
const observer = new ResizeObserver((entries) => {
   
  entries.forEach((entry) => {
    //  console.log(entry);
    let width = entry.contentRect.width;
    let height = entry.contentRect.height;
    container.innerHTML="";
    dummyVals.forEach((chartVal) => {
      const div = document.createElement("div");
      div.id = chartVal.id;
      div.className = "barChart";
      let barHeight = (chartVal.val / maxVal) * height;
      div.style.height = `${barHeight}px`;
      let barWidth=width/(3*dummyVals.length);
      div.style.width= `${barWidth}px`;
      container.appendChild(div);
    });
  });
});
observer.observe(container);

const min768=window.matchMedia("(min-width: 768px)");
const min1024=window.matchMedia("(min-width: 1024px)");
function handle768(query){
    if(query.matches){
        console.log("Viewport crossed 768px");
    }
}
function handle1024(query){
    if(query.matches){
        console.log("Viewport crossed 1024px");
    }
}
min768.addEventListener('change',handle768);
min1024.addEventListener('change',handle1024);
handle768(min768);
handle1024(min1024);