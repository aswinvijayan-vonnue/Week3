let startIndex = 0;
const offset = 10;
async function fetchPost(url) {
  try {
    const response = await fetch(
      `${url}?_start=${startIndex}&_limit=${offset}`,
    );
    if (!response.ok) throw new Error("Http error");
    const data = await response.json();
    startIndex = startIndex + offset;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    document.querySelector('.retry-button').classList.add('visible');
  }
}
const loader=document.querySelector('.loader');
async function handle() {
  try {
    if(document.querySelector('.retry-button').classList.contains('visible'))
      document.querySelector('.retry-button').classList.remove('visible');
    loader.classList.add('visible');
    const res = await fetchPost("https://jsonplaceholder.typicode.com/posts");
    loader.classList.remove('visible');
    res.forEach((item) => {
      display(item);
    });
  } catch (err) {
    console.log(err);
  }
}
const mainArea=document.querySelector('.main-area');
function display(item){
    const postDiv=document.createElement('div');
    postDiv.classList.add('post');
    const titleDiv=document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent=item.title;
    const bodyDiv=document.createElement('div');
    bodyDiv.classList.add('post-body');
    bodyDiv.textContent=item.body;
    postDiv.appendChild(titleDiv);
    postDiv.appendChild(bodyDiv);
    mainArea.appendChild(postDiv);
}
handle();
function callbackfn(entries){
  entries.forEach((item)=>{
    if(item.isIntersecting){
      if(startIndex<100){
        handle();
      }
      else{
        showEnd();
      }
    }
  })
}
const options={
  threshold:1.0
}
const observer = new IntersectionObserver(callbackfn,options);
const sentinel=document.querySelector('.sentinel');
observer.observe(sentinel);
function showEnd(){
  sentinel.textContent="End of feed";
}
document.querySelector('.retry-button').addEventListener('click',handle);
