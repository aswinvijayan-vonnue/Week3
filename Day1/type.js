console.log('null =' + typeof null); //object
console.log('Array [] =' + typeof []); //object
console.log('Key-Value {} = ' + typeof {}); //object
console.log('typeof NaN =' + typeof NaN); //number : used as not a number
console.log('typeof function =' + typeof function () {}); //function
console.log('0==false :' + (0 == false)); //returns true
console.log('""==false :' + ('' == false)); //return true
console.log('null==undefined :' + (null == undefined)); //returns true
console.log('null===undefined :' + (null === undefined)); //comparing both value and type so returning false
console.log('NaN===Nan :' + (NaN === NaN));
console.log("'1'+2 = ", '1' + 2); //casting number into string and two strings are concatenated
console.log("'3'-1 = " + ('3' - 1)); //casting string into number and performs arithmatical subtraction
console.log('true+true : ' + (true + true)); // true equals 1 and performs arithmatical addition
console.log('[]+[] = ' + [] + []); //the object's content firstly converted into string using toString() here two empty arrays so returns empty string
console.log('[]+{} = ' + [] + {}); // [] converted as "" and empty {} as [object Object]

let a = 10,
  val = true,
  str = 'hi';
let b;
let c = null;
let sym = Symbol('abc');

console.log('Primitive Types');
console.log(a, typeof a); //number
console.log(str, typeof str); //string
console.log(b, typeof b); //undefined
console.log(val, typeof val); //boolean
console.log(c, typeof c); //null
console.log(sym, typeof sym); //symbol

let arr = new Array();
console.log('arr ', typeof arr); //object

function get_name(name) {
  return 'hi,' + name;
}
console.log('get_name', typeof get_name); //function
