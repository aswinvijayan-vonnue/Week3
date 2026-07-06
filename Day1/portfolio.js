console.log("The HTML and JavaScript files are successfully linked!");
const name = document.getElementById("h1-name");
name.style.color = "red";
const tags = document.getElementsByClassName("tags");
for (tag of tags) {
  tag.style.backgroundColor = "yellow";
}
document.getElementsByTagName("h2")[0].style.backgroundColor =
  "rgb(175, 156, 156)";
const firstPara=document.querySelector("p");
firstPara.innerHTML="This is the first paragraph";
firstPara.style.backgroundColor="rgba(0,0,0,0.2)";
const anchors=document.querySelectorAll("a");
for(a of anchors){
    a.style.fontWeight="900";
}
const tag1=document.getElementById("tag1");
console.log("For first tags")
console.log("Parent node is"); 
tag1.parentNode.style.backgroundColor="red";
console.log(tag1.parentNode);
console.log("First child");
tag1.firstElementChild.style.backgroundColor="blue";
console.log(tag1.firstElementChild);
console.log("Last element child");
tag1.lastElementChild.style.backgroundColor="green";
console.log(tag1.lastElementChild);
tags[1].nextElementSibling.style.backgroundColor="yellow";

function addCard(title,body,imageurl,id){
    let card=document.createElement("div");
    card.id=id;
    let header=document.createElement("h3");
    header.textContent=title;
    let image=document.createElement("img");
    image.src=imageurl;
    let bodyContent=document.createElement("p");
    bodyContent.textContent=body;
    card.appendChild(header);
    card.appendChild(bodyContent);
    card.appendChild(image);
    document.getElementById("container").appendChild(card);

}
function removeCard(id){
    console.log(id);
    const card=document.getElementById(id);
    console.log("passed");
    console.log(card);
    if(card){
        card.remove();
        console.log(`card with id=${id}removed`);
    }
}
function clearAllCards(card){
    const cards=document.querySelectorAll(card);
    for(cd of cards){
        cd.remove();
        console.log("card removed");
    }


}
addCard(
     "Cat",
     "Cat walking ",
     "https://img.magnific.com/free-photo/adorable-little-baby-kitten-walking_658552-2.jpg?semt=ais_hybrid&w=300&q=80",
     "card1"
   
 )
 addCard(
     "Dog",
     "Dog sitting ",
     "https://picsum.photos/id/237/250",
     "card2"
   
 )
removeCard("card1");
clearAllCards(".card")
