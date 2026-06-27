//pure functions didnot modify global variables or variables which are out of scope of functions
// pure functions always return same value for same combination of input in all the time
//by using pure functions there is no side efects of impacts we get only the output
let users=[{id:101,name:"Rohan",branch:"CSE"},{id:102,name:"Faizal",branch:"ECE"},{id:103,name:"Silna",branch:"EEE"}];
console.log("This is an impure function");
function impureUpdateUser(users,id,changes){
    const user=users.find((user)=>user.id==id);
    users=Object.assign(user,changes);
}
impureUpdateUser(users,102,{branch:"Civil"});
console.log(users);
impureUpdateUser(users,101,{name:"Vyshnav",branch:"Mechanical"});
console.log(users);

//pure functon
function pureUpdateUser(users,id,changes){
    const newarray=users.map((user)=>{
        if(user.id==id) return {...user,...changes};
        return {...user};
    });
    console.log(newarray);
}
pureUpdateUser(users,101,{name:"Amrutha",branch:"Electrical"});
console.log(users); //original array remains same this is the pure function