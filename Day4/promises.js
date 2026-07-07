const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    let ok = false;
    if (ok) {
      resolve("OK");
    } else {
      reject("Not Ok!");
    }
  });
});
promise1
  .then((success) => {
    console.log(`success message recieved: ${success}`);
  })
  .catch((error) => console.error(error));

function canVote(age) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (age >= 18) {
        resolve("Can vote!");
      } else {
        reject("Cannot vote");
      }
    });
  });
}
canVote(25)
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello, Good Morning");
  }, 1000);
});
promise2.then((msg) => console.log(msg));

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Rejected message");
  }, 1000);
}).catch((err) => console.log(err));

const promise4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    let val = 50;
    if (val > 50) {
      resolve(val);
    } else {
      reject(val);
    }
  }, 1000);
});
promise4.then(
  (success) => {
    console.log("Success and returned " + success);
  },
  (err) => {
    console.error("Rejected and returned " + err);
  },
);

function getUser(user) {
  return new Promise((resolve, reject) => {
    if (user !== {}) {
      resolve(user.id);
    } else {
      reject("User not found");
    }
  });
}
function getOrders(userId) {
  let orderId = 193;
  return new Promise((resolve, reject) => {
    if (userId !== undefined) {
      resolve(orderId);
    } else {
      reject("Rejected get orders");
    }
  });
}
function getOrderdetails(orderId) {
  const orderDetails = { id: "1002", item: "Mobile" };
  return new Promise((resolve, reject) => {
    if (orderId > 100) {
      resolve(orderDetails);
    } else {
      reject("Not found");
    }
  });
}
//Reject when any condition fails
const user1 = {name:'Amal',id:200};
getUser(user1).then(
  (success) => {
    getOrders(success).then(
        (success)=>{getOrderdetails(success).then(
            (success)=>{console.log(success)},
            (err)=>console.log(err),
        )},
        (err)=>console.log(err),
    );
  },
  (err) => console.log(err),
);

const promise11=new Promise((resolve,reject)=>{
  setTimeout(()=>resolve(1000),2000);
});
const promise12=new Promise((resolve,reject)=>{
  setTimeout(()=>resolve(2000),3000);
});
 const promise14=new Promise((resolve,reject)=>{
  setTimeout(()=>resolve(3000),5000);
 });
  const promise13=new Promise((resolve,reject)=>{
   setTimeout(()=>reject("Error in promise13"),4000);
 })
Promise.all([promise11,promise12,promise14]).
then((x)=>console.log(x)).catch((err)=>console.log(err)); //if all promises are resolved will return array of values
Promise.all([promise11,promise12,promise13]).
then((x)=>console.log(x)).catch((err)=>console.log(err)); //if atleast on promise rejected will not run then area execute catch area and log error message
Promise.allSettled([promise11,promise12,promise14]).then((results)=>{
   results.forEach((result)=>console.log(result.status));
 }); //shows  status here first two promises resolved or fulfilled and third promise rejected
Promise.race([promise11,promise12,promise14]).then((x)=>console.log(x)); //log promise which have least delay
