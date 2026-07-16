const cards=document.querySelectorAll('.card');
let startTime;

const easeout=(t)=>t * (2-t);

const counterObserver=new IntersectionObserver((entries,observer)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            console.log(entry.target);
            const divContainer=entry.target;
            const timer=divContainer.querySelector('span');
            const target=timer.getAttribute("data-target");
            const duration=2000;
            let start=null;
            const step=(current)=>{
                if(!start) start=current;
                const progress=Math.min((current-start)/duration,1);
                const easeProgress=easeout(progress);
                timer.textContent=Math.floor(easeProgress*target);
                if(progress<1){
                    requestAnimationFrame(step);
                }
            }
            requestAnimationFrame(step);
            observer.unobserve(entry.target);

        }


    })
},{threshold:0.25})
cards.forEach((card)=>counterObserver.observe(card));

function startUpload(){
    const progressBar=document.querySelector('.progress-bar');
    const duration=10000;
    let start=null;
    
   function step(current){
    if(!start) start=current;
    const elapsed=current-start;
    const progress=Math.min(elapsed/duration,1);
    const percentage=progress*100;
    progressBar.style.width=`${percentage}%`;
    if(progress<100){
         setTimeout(()=>{
        requestAnimationFrame(step);
    },100)
    }

   }
   setTimeout(()=>{
        requestAnimationFrame(step);
    },1000)
   
}
 document.querySelector('.upload-button').addEventListener('click',startUpload);