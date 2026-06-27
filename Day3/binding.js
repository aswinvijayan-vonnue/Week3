var name = "amal";
//in absence of any context and function is in global scope then value of this keyword by default bind to window object
//in browser Hello amal will print but in node binding.js print undefined
//In browser window is the global context
function checkdefault() {
  console.log("Default binding");
  console.log("hello ", this.name);
}
checkdefault();
//implicit binding
const obj = {
  val: 10,
  describe() {
    console.log(`Hello, my name is ${this.val}`);
  },
};
obj.describe();

//expicit binding
const person = {
  name: "Alan",
  age: 20,
};
function info(course, place) {
  console.log(
    `${this.name} is ${this.age} years old, studying ${course} from ${place}`,
  );
}
info.call(person, "B.tech", "Bangalore"); //call accepts arguments individually when invoking a function
// info.apply(person,"B.tech","Bangalore"); will throw error
info.apply(person, ["BCA", "Kochin"]); //apply accepts arguments as an array when invoing a function
const studinfo = info.bind(person, "Bsc", "Wayanad"); //bind and generate new function studinfo.this is for permanent changes
studinfo();

function Shape(l, b) {
  this.l = l;
  this.b = b;
}
const val1 = new Shape(10, 20);
console.log(`Length=${val1.l} Breadth=${val1.b} Area=${val1.l * val1.b}`);

//showing this loss
class Test {
  x = 10;
  print() {
    console.log(this);
  }
}
const test = new Test();
const print = test.print;
print(); //in console undefined
//solved using bind
class Test2 {
  x = 20;
  print() {
    console.log(this.x);
  }
}
let test2 = new Test2();
let print2 = test2.print.bind(test2);
print2();
//solved using arrow function
class Test3 {
  x = 30;
  constructor() {
    this.print = () => console.log(this.x);
  }
}
let test3 = new Test3();
let print3 = test3.print;
print3();
//class field
class Test4 {
  x = 40;
  print = () => {
    console.log(this.x);
  };
}
let test4=new Test4();
let print4=test4.print;
print4();

//bindall
console.log(`bindAll function`);
function bindAll(object){
  for(let key in object){
    if(typeof object[key]=='function'){
      object[key]=object[key].bind(object);
    }
  }
}
let obj1={
  x:10,
  name:"Rohith",
  getName: function(){
    console.log(`Hi ${this.name}, Good Morning`);
  },
  val2: function(){
    console.log(`Value is ${this.x}`);

  }
}
let getval=obj1.val2;
let getname=obj1.getName;
getval(); //value is undefined
getname(); //name field undefined
bindAll(obj1);
getval=obj1.val2; 
getname=obj1.getName;
getval(); //value is 20
getname(); //name is filled

//Showing arrow class field fix this even in setTimeout callbacks
console.log("Arrow class fieldfixing even setTimeout callbacks ")

class Test5 {
  constructor(val){
    this.val=val;
  }
  print = () => {
    console.log(this.val);
  };
}
let timeoutfix=new Test5(150);
setTimeout(timeoutfix.print,1000);