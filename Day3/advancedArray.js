const { id } = require("prelude-ls");

const orders=
[
    {
        id:202,
        items:["Shoes","Dress","Pen"]
    },
    {
        id:203,
        items:["Book","Paper","Pencil"]
    },
    {
        id:204,
        items:["Milk","Sugar"]
    }
]
const newarray=orders.flatMap((order)=>{
    return order.items.map((item)=>{
        return {parentId:order.id,item};
    })
})
console.log(newarray);
const log=[
    {
        id:102,
        status:"success"
    },
    {
        id:103,
        status:"success"
    },
    {
        id:104,
        status:"error"
    },
    {
        id:105,
        status:"success"
    },
    {
        id:106,
        status:"success"
    },
    {
        id:107,
        status:"error"
    },
    {
        id:108,
        status:"success"
    }

]
function checkstatus(obj){
    if(obj.status==="error")
    return true;
}
const val=log.findLast(checkstatus); //here check status is the callback function to iteration starts from last index till 
//first match found
console.log("found ",val);
const ind=log.findLastIndex(checkstatus);
console.log("found at index",ind);

function chunk(arr,size){
    let newarr=[];
    let start=0,end=start+size;
    for(let i=0;i<arr.length;i++){
        let val=arr.slice(start,end);
        newarr.push(val);
        start=end;
        end+=size;
        if(start>=arr.length)break;
        
    }
    return newarr;
} 
let arr=[1,2,3,4,5,6,7,8,9,10,11,12];
console.log("\n Chunk array");
console.log(chunk(arr,2));

function zip(...arrays){
    let len=arrays.length;
    let pointer=[];
    let isover=[];
    for(let i=0;i<len;i++){
        pointer[i]=0;
        isover[i]=false;
    }
    let newarray=[];
    while(true){
        for(let i=0;i<arrays.length;i++){
            if(isover[i])
                continue;
            if(pointer[i]>=arrays[i].length) 
                {isover[i]=true;
                    continue;
                }
                 newarray.push(arrays[i][pointer[i]]);
            pointer[i]+=1;
            if(pointer[i]>=arrays[i].length) isover[i]=true;

        }
        if(!isover.includes(false))
            break;
    }
    return newarray;
}
let arr2=[1,2,3], arr3=[4],arr4=[7,8,9,10,11];
console.log("\n Zip array");
console.log(zip(arr2,arr3,arr4));

function groupBy(arr,keyfn){
    return arr.reduce((acc,ele)=>{
        let key=keyfn(ele);
        if(!acc[key]) acc[key]=[];
        acc[key].push(ele);
        return acc;

    },{})
}
const oddoreven=(ele)=>ele%2===0 ? "even" : "odd";
const arr5=[10,11,12,13,15,18,21];
console.log("\n Group by");
console.log(groupBy(arr5,oddoreven));

const months=Array.from({length:12},(_,index)=>{
    return new Date(2026,index).toLocaleString('en-IN',{month: 'long'});
});
console.log("\n Months");
console.log(months);