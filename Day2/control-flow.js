const { map } = require("prelude-ls");
//1
function gradetoletterif(score){
    if(score>=90){
        return 'A';
    }else if(score>=80){
        return 'B'
    }else if (score>=70){
        return 'C';
    }else if(score>=60){
        return 'D';
    }else{
        return 'F';
    }
}
function gradetoletterternary(score){
    return score>=90 ? 'A'
            : score>=80 ? 'B'
            : score>=70 ? 'C'
            : score>=60 ? 'D'
            : 'F';
}
function gradetoletterswitch(score){
    switch(true){
        case (score>=90) && (score<=100):
            return 'A';
            break;
        case (score>=80) && (score<90):
            return 'B';
            break;
        case (score>=70) && (score<80):
            return 'C';
            break;
        case (score>=60) && (score<70):
            return 'D';
            break;
        default:
            return 'F';
    }
}
obj={};
for(let i=0;i<60;i++){
    obj[i]='F';

}
for(let i=60;i<69;i++){
    obj[i]='D';
}
for(let i=70;i<79;i++){
    obj[i]='C';
}
for(let i=80;i<89;i++){
    obj[i]='B';
}
for(let i=90;i<=100;i++){
    obj[i]='A';
}
function gradetoletterlookup(score){
    if(Object.hasOwn(obj,score)){
    return obj[score];
    }
    return 'F';
}

let iterations=1000000;
console.time("1M iteration-if-else");
for(let i=0;i<iterations;i++){
    gradetoletterif(i);
}
console.timeEnd("1M iteration-if-else");
console.time("1M iteration-ternary");
for(let i=0;i<iterations;i++){
    gradetoletterternary(i);
}
console.timeEnd("1M iteration-ternary");
console.time("1M iteration-switch");
for(let i=0;i<iterations;i++){
    gradetoletterswitch(i);
}
console.timeEnd("1M iteration-switch");
console.time("1M iteration-lookup");
for(let i=0;i<iterations;i++){
    gradetoletterlookup(i);
}
console.timeEnd("1M iteration-lookup");

//LOOPS 2
let map1=new Map([
    ["a",1],
    ["b",2],
    ["c",3],
]);
function processQueuewhile(items){
    let keys=items.keys();
    while(items.size!=0){
        let key=keys.next();
        let val=items.get(key.value);
        console.log(`value:${val}`);
        items.delete(key.value);

    }
}
console.log("Calling while loop.....");
processQueuewhile(map1);
let map2=new Map([
    ["a",4],
    ["b",5],
    ["c",6],
]);
function processQueuedowhile(items){
    do{
        let keys=items.keys();
        let key=keys.next();
        console.log(`value is ${items.get(key.value)}`);
        items.delete(key.value);

    }while(items.size!=0)
}
console.log("Calling do-while loop...");
processQueuedowhile(map2);
let map3=new Map([
    ["a",7],
    ["b",8],
    ["c",9],
]);
function processQueueforof(items){
    for([key,value] of items){
        console.log(`${key}:${value}`);
    }
}
processQueueforof(map3);
//3
user1={
    name:"rohan",
    email:"rohan@gmail.com",
    role:"user"
}
user2={
    name:"amal",
    email:"amal",
    role: "admin"
}
user3={}
user4={
    name:"akshay",
    email:"akshay@gmail.com",
    role:"admin"
}
function validateUser(user){
    return !!(user.name && user.email && user.email.includes("@")&&user.role && (user.role==="admin"));
}
console.log(`validating user1 with role as user: ${validateUser(user1)}`);
console.log(`validating user2 email doesn't contain @: ${validateUser(user2)}`);
console.log(`validating user3 empty: ${validateUser(user3)}`);
console.log(`validating user4 all conditions are satisfied: ${validateUser(user4)}`);

//4
function validate(user){
    if(!user.name) return "User not exist";
    if(!user.email) return "Email not exist";
    if(!user.email.includes("@")) return "Not a valid email";
    return "valid";
}
console.log(`user1: ${validate(user1)}`);
console.log(`user2:${validate(user2)}`);
console.log(`user3:${validate(user3)}`)