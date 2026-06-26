class Shape {
  constructor(name, colour = "red") {
    this.name = name;
    this.colour = colour;
  }
  describe() {
    console.log(`This is a basic shape`);
  }
  static compare(a, b) {
    return a < b ? b : a;
  }
}
class Circle extends Shape {
  constructor(radius, color) {
    super("Circle", color);
    this.radius = radius;
  }
  area() {
    this.ar = (Math.PI * this.radius ** 2).toFixed(2);
  }
  perimeter() {
    this.per = (Math.PI * 2 * this.radius).toFixed(2);
  }
  describe() {
    console.log(
      `This is a ${this.name} with colour ${this.colour} : area=${this.ar} and perimeter=${this.per}`,
    );
  }
}
let cir = new Circle(7, "Red");
console.log(cir.name);

cir.area();
cir.perimeter();
cir.describe();
class Rectangle extends Shape {
  constructor(width, height, colour) {
    super("Rectangle", colour);
    this.width = width;
    this.height = height;
  }
  area() {
    this.ar = this.width * this.height;
  }
  perimeter() {
    this.per = 2 * (this.width + this.height);
  }
  describe() {
    console.log(
      `This is a ${this.name} with colour ${this.colour} : area=${this.ar} and perimeter=${this.per}`,
    );
  }
}
let rec = new Rectangle(20, 10, "Blue");
rec.area();
rec.perimeter();
rec.describe();
class Triangle extends Shape {
  constructor(base, height, color) {
    super("Triangle", color);
    this.base = base;
    this.height = height;
  }
  area() {
    this.ar=0.5 * this.base * this.height.toFixed(2)
  }
  perimeter() {
    this.per=this.base + this.height + this.base
  }
  describe() {
    console.log(
      `This is a ${this.name} with colour ${this.colour} : area=${this.ar} and perimeter=${this.per}`,
    );
  }
}
let tri = new Triangle(20, 10, "Green");
tri.area();
tri.perimeter();
tri.describe();
console.log(
  `Comparing area of circle and rectangle, Rectangle have higher area:${Shape.compare(cir.ar, rec.ar)}`,
);
let obj = new Shape();
obj.describe();

class ShapeCollection {
  constructor() {
    this.arr = [];
  }
  add(shape){
    this.arr.push(shape);
    console.log("Pushed successfully: ");
  }
  removeById(id){
    this.arr=this.arr.filter((element)=>element!==id);
  }
  getByType(typeName){
    let val=this.arr.filter((element)=>element.name===typeName);
    console.log(val);
  }
  sortByArea(){
    let sorted=this.arr.sort((a,b)=>b.ar-a.ar);
    console.log(sorted);
  }
  getTotalArea(){
    let val=0;
    this.arr.forEach((ele)=>{
        if(ele.ar!==NaN){
            val+=Number(ele.ar);
        }
        

    });
    console.log(`Total area is ${val}`);
  }
}
let tri2 = new Triangle(30, 15, "Black");
tri2.area();
tri2.perimeter();
let tri3 = new Triangle(20, 15, "Black");
tri3.area();
tri3.perimeter();
let rec1 = new Rectangle(10, 10, "Orange");
rec1.area();
rec1.perimeter();
let cir1 = new Circle(14, "White");
cir1.area();
cir1.perimeter();

const collectionobj=new ShapeCollection();
//append
console.log("Calling pushing");
collectionobj.add(tri);
collectionobj.add(tri2);
collectionobj.add(tri3);
collectionobj.add(rec);
collectionobj.add(rec1);
collectionobj.add(cir1);
collectionobj.add(cir);
//remove by id
console.log("calling remove by id");
collectionobj.removeById(tri);
//calling get by type
console.log("calling get by type");
collectionobj.getByType("Rectangle");
//calling sort by area
console.log("Calling sort by area");
collectionobj.sortByArea();
//calling get total area
console.log("Calling get total area");
collectionobj.getTotalArea();

//instanceof
console.log(tri instanceof Triangle);//object made from class Triangle
console.log(tri instanceof Shape); //Triangle class extends Shape
console.log(cir instanceof Triangle); //cir not an instance of Triangle
console.log(cir instanceof Circle); //instanceof Circle

//prototype for learning
class Person{
    constructor(name){
        this.name=name;
    }


}
Person.prototype.age=22;
Person.prototype.greetings=function(){
    console.log("Hello Iam ",this.name);
}
const myPerson=new Person("Amal");
console.log(myPerson.name);
console.log(myPerson.age);
myPerson.greetings();
console.log(myPerson);//age is not visible here created using prototype
console.log(myPerson.__proto__);//everything is visible
console.log("Object.getPrototypeOf(myPerson):",Object.getPrototypeOf(myPerson));

//constructor.name
class Myclass{
    constructor (){
        this.arr=[{a:'ab',b:'bc'}];
    }
    checktype(){
        console.log(this.arr[0].constructor.name); //constructor.name mainy uses for type checking and debugging
        console.log(this.constructor.name);

    }
}
let cls=new Myclass();
cls.checktype();
let arr1=[];
console.log("arr1 : ",typeof arr1); //sometimes not helpful
console.log("arr1 : ",arr1.constructor.name); //given exact
