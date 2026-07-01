const articles=document.querySelectorAll(".article");
console.log(articles);
const observer=new IntersectionObserver((entries)=>{

    entries.forEach((entry)=> {
        if(entry.isIntersecting)
            entry.target.classList.add("visibile");
        else
            entry.target.classList.remove("visibile");


    })
},
{
    threshold:0.2
});
articles.forEach(article => {
    observer.observe(article);
    
});
function progressUpdate(){
    const but=document.querySelector(".back-to-top");
    const scrolltop=window.scrollY;
    console.log(scrolltop);
    if(scrolltop>=300)
        but.classList.add("back-button");
    else
        but.classList.remove("back-button");

    const documentheight=document.documentElement.scrollHeight-document.documentElement.clientHeight;
    console.log(`document height is ${documentheight}`);
    if(documentheight<=0) return;
    const bar=document.querySelector(".scrollbar");
    const width=(scrolltop/documentheight)*100;
    console.log(`Scrolled ${width}%`);
    bar.style.width=`${width}%`;
}
window.addEventListener('scroll',(event)=>{
    requestAnimationFrame(progressUpdate);

});
function moveTop(event){
    console.log(event.target);
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
}