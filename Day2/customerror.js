
class ValidationError extends Error{
    constructor(message,statuscode=400,field){
        super(message);
        this.statuscode=statuscode;
        this.field=field;
    }
}

function test(){
    throw new ValidationError("Invalid input",400,"email");
}
try{
    test()
}catch(err){
    console.error(err.message);
    console.error(err.statuscode);
    console.error(err.field);
}
function parseinput(input){
    if(typeof input!="number")
        throw new TypeError("input must be a number");
    if(input<=0)
        throw new RangeError("Number must be positive integer");
    if(input<18)
        throw new ValidationError("User must be atleast 18 years old");
    return "valid";
}
try{
    console.log(parseinput("as"));
}catch(err){
    if(err instanceof TypeError){
        console.log("Type error")
        console.error(err.message);

    }
    if(err instanceof RangeError){
        console.log("range error");
        console.log(err.message);
    }
    if(err instanceof ValidationError){
        console.log("Validation error");
        console.log(err.message);
    }
}
window.onerror=function(message,url,line){
    alert(`Message:${message} URL:${url} at line:${line}`);
    return true;
}
//abc()
const overlay=document.querySelector(".overlay");
const errorBut=document.querySelector(".error");
console.log(errorBut);

window.addEventListener("unhandledrejection",(event)=>{
    event.preventDefault();
    console.log(event);
    overlay.innerHTML="Unhandled rejection:"+event.reason;
})
errorBut.addEventListener('click',(event)=>{    
    Promise.reject("Error");
})
