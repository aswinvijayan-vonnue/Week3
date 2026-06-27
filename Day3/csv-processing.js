
const str='name,age,Department,Degree\nabin,-21,CS,B.tech\nb,30,EC,B.Tech\nc,28,EEE,M.Tech';
function parseCSV(str){
    const [header,...rows]=str.split('\n');
    const headerColumns=header.split(',');
    let ro=rows.map((row)=>row.split(','));
    const finalresult=ro.map((row)=>{
        return headerColumns.reduce((obj,head,index)=>{
        obj[head]=row[index];
        return obj

    },{})
    })
    return finalresult;

}
function validateRows(result){
    return result.map((row,index) => {
        for(let key in row){
                if(!row[key] || row[key].trim()==""){
                  return{...row,"valid":false} ;
                }
        }
        let num=Number(row["age"]);
        if(isNaN(num) || num>=100 || num<=0){
            console.log(`Row number ${index+1} : Invalid age`);
            return{...row,"valid":false} ;
        }
        return{...row,"valid":true} ;



        
    });
    
}
function transformRows(result){
    // console.log("in transform",result);
    return result.map((row)=>{
        if(row["Degree"]=="B.Tech")
            return {...row,"Degree":"UG"}
        return {...row,"Degree":"PG"}

    })
}
function formatRows(result){
    return result.map((row)=>{
        let name=row["name"];
        name=name.charAt(0).toUpperCase()+name.slice(1);
        return {...row,name};
    })

}
function filterInvalid(result){
    return result.filter((row)=>{
        if("valid" in row && row["valid"]==true)
            return {...row};
    })
}
// parseCSV(str);
// const results=parseCSV(str);
// console.log("parsed",results);
// const validated=validateRows(results);
// console.log("validated:",validated);
// const transformed=transformRows(validated);
// console.log("Transformed: ",transformed);
// const filtered=filterInvalid(transformed);
// console.log("filtered:",filtered);
// const formatted=formatRows(filtered);console.log("formatted:",formatted);
console.log("function");
console.log(formatRows(filterInvalid(transformRows(validateRows(parseCSV(str))))));

const user={
    name:"Shimna",
    role: "Developer",
    batch:{
        year:2026,
        name: "abc"
    }
};
Object.freeze(user); //makes objects immutable we cant change the value 
user.name="Athulya"; //doesnt change
user.batch.name="cda"; //but made nested object mutable
console.log(user);
//nested
function deepFreeze(obj){
    if(obj && typeof obj ==="object" && !Object.isFrozen(obj)){
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach((ob)=>{
            // const val=obj[ob];
            // if(val && typeof val ==="object" && Object.isFrozen)
            return deepFreeze(obj[ob]);

        });
    }
    return obj;
}
// console.log(Object.isFrozen(user));
const user1={
    name:"Abhinav",
    role: "Engineer",
    batch:{
        year:2022,
        name: "cda"
    },
    scores: [10,30]
};
console.log(user1);
deepFreeze(user1);
console.log(Object.isFrozen(user1));
user1.name="Amal";
user1.batch.year=2026;
console.log(user1);



