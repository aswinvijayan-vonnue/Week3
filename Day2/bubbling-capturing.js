//bubbling
document.querySelector("#grandparent")
.addEventListener('click', ()=>{
    console.log("Grandparent clicked");
});
document.querySelector("#parent")
.addEventListener('click',()=>{
    console.log("Parent clicked");
});
document.querySelector("#child")
.addEventListener('click',()=>{
    console.log("Child clicked");
});
//capturing
document.querySelector("#cgrandparent")
.addEventListener('click',()=>{
    console.log("Grand parent is clicked");
},true);
document.querySelector("#cparent")
.addEventListener('click',()=>{
    console.log("Parent is clicked");
},true);
document.querySelector("#cchild")
.addEventListener('click',()=>{
    console.log("Child is clicked");
},true);
//stop propagation
document.querySelector("#sgparent")
.addEventListener('click',(event)=>{
    console.log("clicked grandparent");
});
document.querySelector("#sparent")
.addEventListener('click',(event)=>{
    console.log("clicked parent");
     event.stopPropagation();
});
document.querySelector("#schild")
.addEventListener('click',(event)=>{
    console.log("clicked child");
    event.stopPropagation();
});
//stopimmediate propagation
document.querySelector(".immediate")
.addEventListener('click',(event)=>{
    console.log("Button clicked");
    event.stopImmediatePropagation();

});
document.querySelector(".immediate")
.addEventListener('click',(event)=>{
    console.log("This event does not occur");
});
document.querySelector(".container")
.addEventListener('click',(event)=>{
    console.log("This is the container");
});
document.querySelector("#name-form")
.addEventListener('submit',(event)=>{
    console.log("prevented default behaviour of form");
    event.preventDefault();
});
document.querySelector("#google")
.addEventListener('click',(event)=>{
    console.log("anchor link prevent default");
    event.preventDefault();
})