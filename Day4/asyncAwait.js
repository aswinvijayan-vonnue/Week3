class ValidateError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidateError";
  }
}
function getUser() {
  let id = 30;
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(id), 1000);
  });
}
async function getOrders() {
  let orderId = 105;
  try {
    const userid = await getUser();
    if (userid == undefined) throw new ValidateError("Invalid user");
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve(orderId), 1000),
    );
  } catch (err) {
    console.error(err.message);
  }
}
async function getOrderDetails() {
  let order = { id: 105, item: "Mobile" };
  try {
    const orderid = await getOrders();
    if (orderid !== 105) throw new ValidateError("Invalid orderId");
    console.log("Order found ", order);
  } catch (err) {
    console.log(err.message);
  }
}
getOrderDetails();

async function loadDashboard(userId){
    try{
        if(userId==undefined) throw new Error("Invalid userId");
        let user,posts,todos;
        try{
            [user,posts,todos]=await Promise.all([
            (await fetch(`https://jsonplaceholder.typicode.com/users?id=${userId}`)).json(),
            (await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)).json(),
            (await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)).json()
        ]
        )
        if(user.length==0){
            throw new Error("User not found");
        }
        }catch(err){
            console.log("step 1 failed");
            throw err;
        }
        try{
            if(posts.length==0){
                throw new Error("Didnt have any posts yet");
            }
            let postId=posts[0].id;
            console.log("post id is: ",postId);
            let comments=await(await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)).json();
            console.log(comments);

        }catch(err){
            console.log("error in step 2")
            console.error(err.message);
            throw err;
        }
}catch(err){
    console.error(err.message);
    throw err;
}

}
loadDashboard(2).catch((err)=>console.error(err.message));

//sequential and parallel bug
async function sequential(){
    try{
        console.time("sequential");
        await new Promise((resolve,reject)=>{
            setTimeout(()=>resolve(1),2000);
        })
        await new Promise((resolve,reject)=>{
            setTimeout(()=>resolve(2),1000);
        })
        console.timeEnd("sequential");

    }catch(err){
        console.log(err);
    }
}
async function parallel(){
    try{
        const p1=new Promise((resolve,reject)=>{
            setTimeout(()=>resolve(5),2000);
        });
        const p2=new Promise((resolve,reject)=>{
            setTimeout(()=>resolve(6),1000);
        });
        console.time("parallel");
        const val=await Promise.all([p1,p2]);
        console.timeEnd("parallel");

    }catch(err){
        console.log(err);

    }
}
sequential();
parallel();
async function sendWithForEach(){
    let items=['apple','orange','mango'];
    items.forEach(async (item)=>{await print(item)}); //didnt worked first logged all items sent
    console.log("All items sent through for each");

}
async function sendWithForOf(){
    let items=['mobile','dress','vegetables'];
    for(let item of items){
        await print(item);
    }
    console.log("All items sent through for of");
}
async function sendWithMap(){
    let items=['item A','item B','item C'];
    await Promise.all(items.map(async (item)=>{
        await print(item);
    }))
    console.log("All items sent through map");
}

function print(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(id);
            resolve();
        },1000);
    });

}
setTimeout(()=>{sendWithForEach();},2000);
setTimeout(()=>{console.log("\nCalling for-of");sendWithForOf();},4000);
setTimeout(()=>{console.log("\nCalling sendWithMap");sendWithMap();},8000);