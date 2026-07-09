const cards=document.querySelectorAll('.card');
let startTime;

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
                timer.textContent=Math.floor(progress*target);
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