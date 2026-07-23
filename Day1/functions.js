function greet(name, greeting = "Hello") {
  console.log (greeting + ", " + name);
}
greet("Alwin");

const greet2=function(name,greeting="Hello"){
    console.log (greeting + ", " + name);
}
greet2("Amal");

const greet3=(name,greeting="Hello")=> greeting+", "+name;
console.log(greet3("Vishnu"));

const obj= {
    greet4(name,greeting="Hello"){
        return greeting + ", " + name;
    }
    
}
val=obj.greet4("Rohan");
console.log(val);

class calc {
    addition(num1,num2){
        return num1+num2;
    }
    subtraction(num1,num2){
        return num1-num2;
    }
    multiplication(num1,num2){
        return num1*num2;
    }
    division(num1,num2){
        if(num2==0){
            return "Zero division error";
        }
        return num1/num2;
    }

};
let obj1=new calc();
console.log("7+3=",obj1.addition(3,7));
console.log("12-7=",obj1.subtraction(12,7));
console.log("7*3=",obj1.multiplication(7,3));
console.log("10/2=",obj1.division(10,2));
console.log("7/0=",obj1.division(7,0));

function createMultiplier(factor){
    return function(val){
        return factor*val;
    } 
}
console.log("CreateMultiplier :",createMultiplier(10)(4));
console.log(createMultiplier(7)(3)===21);

function test(number1,number2,...numbers){
    console.log("arguments:",arguments);
    console.log("parameters:",numbers);

}
test(1,2,3,4,5,6,7,8,9);
//arrowe function cannot use arguments
// const arrow=(para1,para2)=>console.log(arguments);
// arrow(6,9);