
class Observer{
    constructor(){
        this.observers=new Array();
    }
    addObserver(fn){
        this.observers.push(fn);
    }
    notifyAll(data){
        this.observers.forEach((fn)=>{
            fn(data);
        })
    }
}
let listener=new Observer();
listener.addObserver(render);
class Cart{
    constructor(items=new Array()){
        this.items=items;
        listener.notifyAll(items);
    };
    addItem(item){
        let newItems=[...this.items,item];
        console.log(newItems);
        stack.push(this);
        return new Cart(newItems);

    }
    removeItem(id){
        let newItems=this.items.filter((item)=>item.id!=id);
        stack.push(this);
        return new Cart(newItems);
    }
    updateQuantity(id,val){
        let updated=this.items.map((item)=>{
            if(item.id==id){
                let prevQuantity=Number(item.quantity);
                return {...item,quantity:prevQuantity+Number(val)};
            }else{
                return {...item}
            }
        });
        stack.push(this);
        return new Cart(updated);
    }
    applyCoupon(id,rate){
        let applied=this.items.map((item)=>{
            if(item.id==id){
                let discount=100-rate;
                let price=item.price*discount/100;

                return {...item,price:Number(price.toFixed(2)),couponApplied:true};
            } 
            return {...item}
        })
        stack.push(this);
        return new Cart(applied);
    }
    getTotal(){
        let total=0;
        for(let item of this.items){
            total+=item.price;
        }
        return total;
    }
}
let items=[
    {
        id:101,
        name:'Rice',
        quantity: 100,
        price: 1000
    },
    {
        id:102,
        name: 'Apple',
        quantity: 50,
        price:1000
    },
    {
        id:103,
        name: 'Mango',
        quantity: 70,
        price: 1000
    },
    {
        id:104,
        name: 'Lemon',
        quantity: 20,
        price: 1000
    }
]
// let cart=new Cart(items);
// let cart2=cart1.addItem(item1);
// let cart3=cart2.removeItem(103);
// let cart4=cart2.updateQuantity(104,80);
// let cart5=cart4.applyCoupon(104,10);
// let cart=new Cart(items);
let stack=[];
let cart;
let val=localStorage.getItem("cart");
val=JSON.parse(val);
console.log("hi",val.length==0);
if(val==0){
    console.log("in zero");
    cart=new Cart();
}else{
    cart=new Cart(val);

}
// cart=cart.addItem(item1);
// cart=cart.updateQuantity(104,80);
// cart=cart.applyCoupon(104,10);
// console.log(cart.getTotal());

const noti1=(data)=>{
    console.log("After state change:",data);
}
listener.addObserver(noti1);
function render(items){
    const container=document.querySelector(".cart");
    const existingCartItems=document.querySelectorAll(".cart div");
    for(let existingcart of existingCartItems){
        existingcart.remove();
    }
    if(items[0]==undefined) return;
    for(let item of items){
        const cartItem=document.createElement('div');
        cartItem.textContent=`id:${item.id}\n name: ${item.name}\n quantity:${item.quantity}\nprice: ${item.price}`;
        container.appendChild(cartItem);

    }

}
const form=document.querySelector(".not-visible")
const remove=document.querySelector(".remove-form");
const rmButton=document.querySelector(".remove-button");
rmButton.addEventListener('click',(e)=>{
    remove.classList.toggle('visible');
});
remove.addEventListener('submit',(e)=>{
    e.preventDefault();
    let id=e.target.elements.did.value;
    cart=cart.removeItem(id);
    localStorage.setItem("cart",JSON.stringify(cart.items));
    // localStorage.setItem("cart",cart.items);
    remove.classList.remove('visible');
})

function undo(){
    console.log(stack);
    
    if(stack.length==0) return;
    let node=stack.pop();
    console.log(node.items);
    localStorage.setItem("cart",JSON.stringify(node.items));
    render(node.items);
}


function update(event){
    console.log(event);
    const divcontainer=event.target.closest('.itemlist')
    const counter=divcontainer.querySelector(".counter");
    const price=divcontainer.querySelector(".price");
    let val=Number(price.querySelector('span').textContent);
    let count=Number(counter.querySelector('span').textContent);
    console.log(price.querySelector('span').textContent);
    
    let baseprice=val/count;
    count++;
    baseprice=baseprice*count;
    counter.querySelector('span').textContent=count;
    price.querySelector('span').textContent=baseprice;
}


function addEvent(event){
    const container=event.target.closest('.itemlist');
const id=container.querySelector(".id").querySelector('span').textContent;
const name=container.querySelector(".name").querySelector('span').textContent;
let val=Number(container.querySelector('.price').querySelector('span').textContent);
let count=Number(container.querySelector('.counter').querySelector('span').textContent);
let itemset={
    id,
    name,
    quantity:count,
    price: val
}
cart=cart.addItem(itemset);
localStorage.setItem("cart",JSON.stringify(cart.items));

}
const itemContainer=document.querySelector('.add-container');
console.log("hloooo",items);
items.forEach((item)=>{
    let itemlist=document.createElement('div');
    itemlist.classList.add("itemlist");
    let id=document.createElement('p');
    id.classList.add("id");
    id.innerHTML=`ID: <span>${item.id}</span>`
    let name=document.createElement('p');
    name.classList.add("name");
    name.innerHTML=`Item: <span>${item.name}</span>`;
    let count=document.createElement('p');
    count.classList.add("counter");
    count.innerHTML=`Quantity : <span>${item.quantity}</span>`;
    let price=document.createElement('p');
    price.classList.add("price");
    price.innerHTML=`Price : <span>${item.price}</span>`;
    itemlist.appendChild(id,name,count,price);
    itemlist.appendChild(name);
    itemlist.appendChild(count);
    itemlist.appendChild(price);
    //  itemlist.appendChild(name,counter,price);
    //   itemlist.appendChild(count);
    //    itemlist.appendChild(price);
    let updating=document.createElement('button');
    updating.classList.add("updater");
    updating.innerHTML=`&#43;`;
    updating.addEventListener('click', (event) => {
    update(event);
});
    itemlist.appendChild(updating);
    let cart=document.createElement('button');
    cart.innerHTML=`Add to Cart`
    cart.classList.add("addToCart");
    cart.addEventListener('click',(event)=>{
        addEvent(event);
    });
    itemlist.appendChild(cart);
    itemContainer.appendChild(itemlist);


});
cart=cart.updateQuantity(104,10);


