
//let comments=[{name,comment,likeval,timestamp,reply[]}];
// let commentCollection=[];
let raw=localStorage.getItem('comments');
const commentCollection = raw ? JSON.parse(raw) : [];
console.log(commentCollection);
function addCommentToArray(name,comment,timestamp){
    const newComment={
        name,
        comment,
        likeval:0,
        timestamp,
        reply:[]
    };
    console.log(newComment);
    commentCollection.push(newComment);
    localStorage.setItem('comments',JSON.stringify(commentCollection));
}
function addreplyComment(targetArray,parentTimestamp,name,comment,timestamp){
    const newComment={
        name,
        comment,
        likeval:0,
        timestamp,
        reply:[]
    };
    for(let item of targetArray){
        if(item.timestamp===parentTimestamp){
            item.reply.push(newComment);
            return true;
        }
        if(item.reply && item.reply.length>0){
            const found= addreplyComment(item.reply,parentTimestamp,name,comment,timestamp);
            if(found) return true;
        }
    }
    return false;
}
const firstCommentBox=document.querySelector('.comments');
function displayComments(commentsArray,targetContainer){
    commentsArray.forEach((item)=>{
        const comment={
        name:item.name,
        comment:item.comment

     };
     const likeval=item.likeval;
     const timestamp=item.timestamp;
     const liContainer=commentdisplay(comment,likeval,timestamp);
     if(targetContainer!==null){
     targetContainer.prepend(liContainer);
     if(item.reply && item.reply.length>0){
        const newli=liContainer.querySelector('.comments');
        displayComments(item.reply,newli);
     }
    }

    })

}
displayComments(commentCollection,firstCommentBox);
const form=document.getElementById('comment-form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const data=new FormData(form);
    const formatted=Object.fromEntries(data.entries()); //easy way to store form data
    console.log(formatted);
    const container=commentdisplay(formatted);
    firstCommentBox.prepend(container);
    const timestamp=container.getAttribute('data-timestamp');
    console.log(timestamp);
    addCommentToArray(formatted.name,formatted.comment,timestamp);
    // comments.push(formatted);
    // commentdisplay(formatted);
    form.reset();
})
function commentdisplay(comment,likeval=0,timestamp=Date.now()){
    const mainLi=document.createElement('li');
    mainLi.setAttribute('data-timestamp', timestamp);
    mainLi.classList.add('single-comment');
    const span1=document.createElement('span');
    const span2=document.createElement('span');
    const span3=document.createElement('span');
    const span4=document.createElement('span');
    const button41=document.createElement('button');
    const span411=document.createElement('span');
    span411.classList.add('count');
    span411.textContent=likeval;
    button41.classList.add('icon');
    button41.textContent="♡";
    button41.appendChild(span411);
    button41.addEventListener('click',clickevent);
    span4.appendChild(button41);
    const button=document.createElement('button');
    const form=document.createElement('form');
    const details=document.createElement('details');
    const summary=document.createElement('summary');
    const ul=document.createElement('ul');
    span1.textContent=comment.name;
    span2.textContent=comment.comment;
    button.classList.add('reply-button');
    button.textContent="Reply to this conversation...";
    button.addEventListener('click',toggleform);
    span3.appendChild(button);
    form.classList.add('comment-form');
    const namefield=document.createElement('input');
    namefield.type="text";
    namefield.name="name";
    namefield.placeholder="Your Name";
    const textarea=document.createElement('textarea');
    textarea.name="comment";
    textarea.placeholder="Leave your comment here...";
    const submitbutton=document.createElement('button');
    submitbutton.type="submit";
    submitbutton.classList.add('comment-submit');
    submitbutton.textContent="Comment";
    summary.textContent="Replies";
    form.appendChild(namefield);
    form.appendChild(textarea);
    form.appendChild(submitbutton);
    form.addEventListener('submit',generateNewForm);
    ul.classList.add('comments');
    details.classList.add('comment-section');
    details.appendChild(summary);
    details.appendChild(ul);
    mainLi.appendChild(span1);
    mainLi.appendChild(span2);
    mainLi.appendChild(span4);
    mainLi.appendChild(span3);
    mainLi.appendChild(form);
    mainLi.appendChild(details);
    return mainLi;



}

const replybuttons=document.querySelectorAll('.reply-button');
replybuttons.forEach((button)=>{
    button.addEventListener('click',toggleform)});
function toggleform(e){
    const spanwrapper=e.target.parentElement;
        const form=spanwrapper.nextElementSibling;
        if(form.classList.contains('comment-form')){
            form.classList.toggle('visible');
}
}
const allforms=document.querySelectorAll('.comment-form');
allforms.forEach((form)=>{
    form.addEventListener('submit',(e)=>{
        generateNewForm(e);
        

    })
})
function generateNewForm(e){
    e.preventDefault();
    const currentForm=e.target;
    console.log(currentForm);
    const parentElement=e.target.parentElement;
    const parentTime=parentElement.getAttribute('data-timestamp');
    //targetArray,parentTimestamp,name,comment,timestamp
    const container1=parentElement.querySelector('.comments')
    const data=new FormData(currentForm);
    const formatted=Object.fromEntries(data.entries()); //easy way to store form data
    console.log(formatted);
    if(formatted.name.trim()=="" || formatted.comment.trim()==""){
        console.log('null value');
        return;
    }
    const newSection=commentdisplay(formatted);
    const timestamp=newSection.getAttribute('data-timestamp')
    let val=addreplyComment(commentCollection,parentTime,formatted.name,formatted.comment,timestamp);
    if(val){
        localStorage.setItem('comments',JSON.stringify(commentCollection));
    }
    container1.prepend(newSection);
    currentForm.classList.toggle('visible');
    console.log(commentCollection);
    currentForm.reset();
}
function updatelike(targetarray,value,timestamp){
    if(timestamp==null){
        return;
    }
    for(let item of targetarray){
        if(item.timestamp===timestamp){
            item.likeval=value;
            return true;
        }
        if(item.reply && item.reply.length>0){
            const found=updatelike(item.reply,value,timestamp);
            if(found) return true;
        }
    }
    return false;
}
const likeButton=document.querySelector('.icon');
likeButton.addEventListener('click',clickevent);
function clickevent(e){
    const likeContainer=e.target;
    console.log(likeContainer);
    const parent=e.target.closest('.single-comment');
    console.log("parent",parent);
    console.log(likeContainer.classList.contains('icon-update'));
    if(!likeContainer.classList.contains('icon-update')){
        console.log(likeContainer);
        likeContainer.classList.add('icon-update');
        console.log(likeContainer.querySelector('.count').textContent==null);
        const counterVariable=likeContainer.querySelector('.count');
        if(counterVariable!=null && counterVariable.textContent!==""){
        let counter=Number(counterVariable.textContent);
        counter++;
        const timestamp=parent.getAttribute('data-timestamp');
        let val=updatelike(commentCollection,counter,timestamp);
        if(val){
             localStorage.setItem('comments',JSON.stringify(commentCollection));
        }
        console.log(counter);
        console.log(commentCollection);
        likeContainer.querySelector('.count').textContent=counter;}

    }
    return;

    
}