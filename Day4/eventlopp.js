// console.log("Start");
// setTimeout(()=>{console.log("Running")},4000);
// console.log("End");
//eventloop add the tasks from task queue/callback queue to call stack only when the call stack is empty
//microtask queue having higher priority eventloop firstly took tasks from microtask queue

const { log } = require("node:console");

//any call back function chaining inside promise will go to microtask queue
function test1(){
    Promise.resolve()
    .then(() => console.log("1"));//Instantly moved to multi task queue
    setTimeout(()=>console.log("2"),0);//moved in timer API once finished moved to task queue
    queueMicrotask(()=>console.log("3"));//enqueued in microtask queue tasks from task queue will popped ony when microtask queue is empty
    console.log("4"); //will execute first
    //order 4-1-3-2

}
console.log("Calling function 1");
test1();

function test2(){
   queueMicrotask(()=>console.log("1"));//directly moved to microtask queue popped immediately when call stack is empty
   console.log("2");
   Promise.resolve()
   .then(()=>console.log("3")); //directly moved to microtaskqueue execute just after queuemicrotask executed
   setTimeout(()=>console.log("4"),0);
   //order 2-1-3-4
}
console.log("\nCalling function2");
test2();
function test3(){
    console.log("1"); //log first directly to call stack
    queueMicrotask(()=>{ //enque directly to multi task queue when call stack is empty call this
        console.log("2");
        queueMicrotask(()=>{console.log("3")}) //enque when parent function is in call stack that is after promise 
    })
    Promise.resolve() //enqueue directly to multi task just after above
    .then(()=>console.log("4"));
    setTimeout(()=>console.log("5"),0); //when all are executed this will
    //order 1-2-4-3-5
}
console.log("\nCalling function3");
test3();
function test4(){
    console.log("1"); //execute first
    setTimeout(()=>console.log("2"),0);//enqueue in call stack after time limit reached here 0 when the call stack and microtas queue is empty this will be dequeued
    queueMicrotask(()=>console.log("3")); //enqueued to microtask queue
    Promise.resolve()
    .then(()=>console.log("4")); //enqueued to microtask queue
    //order 1-3-4-2
}
console.log("\n calling function 4");
test4();
function test5(){
    setTimeout(()=>{
        Promise.resolve()
        .then(()=>{
            console.log("1");
        });
        console.log("2");
        queueMicrotask(()=>console.log("3"));
    },0)
    //setTimeout directly enqueue to task queue once when it reaches in call stack promise enqueue into multitask queue log 2 and enqueue queueMicrotask in microtask queue, thus order is 2-1-3
}
test5();
function test6(){
    setTimeout(()=>{
        console.log("1");
        Promise.resolve()
        .then(()=>{
            console.log("2");
        })

    },1000);
    setTimeout(()=>{
        console.log("3");
        queueMicrotask(()=>console.log("4"));
    },0);
    //first settimeout will wait for 1 second in webapi 2nd setTimeout directly enqueue to task queue then first, so order is 3-4-1-2
}
test6();
function test7(){
    Promise.resolve()
    .then(()=>{
        Promise.resolve()
        .then(()=>{
            Promise.resolve()
            .then(()=>{
                setTimeout(() => {
                    console.log("4");
                }, 0);
                console.log("3");
                Promise.resolve()
                .then(()=>console.log("5"));
            })
            console.log("2");
        })
        console.log("1");
    })
    //outermost promise will run first. no code in call stack, then nested two promises, in the inner most promise there are three code snipptes console.log first then the promise invoke, atlast the set timeout function. order 1-2-3-5-4 
}
test7();
function test8(){
    setTimeout(()=>{
        setTimeout(()=>{
            setTimeout(()=>{
                queueMicrotask(()=>console.log("4"));
                console.log("2");
            },1000);
        },1000)
        setTimeout(()=>{
            console.log("3");
        },3000);
        console.log("1");
    },0)
    //outermost setTimeout execute first, after-inner there are two setTimeout functions one with delay 1 second another with delay 3 second so 1 second delayed timeout function execute next logs 2 then 4 atlast log 3 order 1-2-4-3
}
test8();
function test9(){
    queueMicrotask(()=>{
        queueMicrotask(()=>{
            setTimeout(()=>{
                console.log("3");
            },0);
            console.log("2");
        })
        console.log("1");
    });
    //outermost queueMicrotask execute first then nested one,atlast setTimeout function will execute. Thus order is 1-2-3
}
test9();
function test10(){
    queueMicrotask(()=>{
        setTimeout(()=>{
            console.log("4")

        },1000);
        Promise.resolve()
        .then(()=>{
            console.log("3");
        })
        console.log("2")
    })
    console.log("1");
}
//firstly in call stack there console.log,after that queueMicrotask will fed from microtask queue-setTimeout function fed to webapi once delay reached then enqued to task queue Promise is directly enqued to microtask queue and logs 2,then Promise is invoed last timeout function. order 1-2-3-4
test10();