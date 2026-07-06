//Decleration
{
  var num1;
  console.log(num1); //undefined
  let num2;
  console.log(num2); //undefined
  //const num;
  //   console.log(num); SyntaxError: Missing initializer in const declaration
}
//assignment
{
  var num3 = 20;
  console.log(num3);
  let num4 = 30;
  console.log(num4);
  const cnum1 = 80;
  console.log(cnum1);
}
//hoisting
{
  num5 = 10;
  num5 = num5 + 1;
  console.log(num5); //support hoisting
  var num5;
  //num6 = 20;
  // num6 = num1 + 5;
  // console.log(num6); //ReferenceError: Cannot access 'num1' before initialization
  // let num6;
  //   cnum2=100;
  //   console.log(cnum2); Cannot access 'cnum2' before initialization
  //   const cnum2=90;
}
//reassignment
{
  var num6 = 100;
  num6 = 200;
  console.log(num6);
  let num7 = 110;
  num7 = 210;
  console.log(num7);
//   const num8 = 120; TypeError: Assignment to constant variable.
//   num8 = 220;
//   console.log(num8);
}
if (true) {
  let num8 = 30;
  var num9 = 40;
  const num10 = 50;
  console.log(num8, "let Inside the block ");
  console.log(num9, "var inside the block");
  console.log(num10, "const inside the block");
}
// console.log(num8,"let outside the block"); Scope only inside the block
console.log(num9,"var outside the block");
// console.log(num10,"outside the block"); Scope only inside the block

function fun1(){
    let val1=10;
    var val2=20;
    const val3=30;

    function fun2(){
        let val4=40;
        var val5=50;
        const val6=60;
        function fun3(){
            console.log(val1,"let variable from function1");
            console.log(val2,"var variable from function1");
            console.log(val3,"const variable from function 1");

            console.log(val4,"let variable from function2");
            console.log(val5,"var variable from function2");
            console.log(val6,"const variable from function2");
        }
        fun3();
    }
    fun2();
}
fun1();
//var-in-loop closure bug
for(var i=0;i<5;i++){
    setTimeout(()=>{
        console.log(i);
    },1000);
}
//replaced with let
for(let i=0;i<5;i++){
    setTimeout(()=>{
        console.log(i);
    },1000);
}