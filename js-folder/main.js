

let shop = document.getElementById("shop");


let basket = JSON.parse(localStorage.getItem("proData")) || [];

 // create a  generateproduct card function
let generateShop = ()=>{
   return (shop.innerHTML = shopItemData.map((ele)=>{

       let {id,name,price,img,company_name,rating}=ele;
    

       let searchProItem = basket.find((proId) => proId.id === id) || [];
       
           return  `<div id=product-id${id} class="item">
           <img src="${img}" alt="product-image">
           <div class="product-des">
               <span>${company_name}</span>
               <h5>${name}</h5>
            <div class="stars">
               <div class="star rate-num">${rating.rateNum}</div>
               <div class="star">${rating.star}</div>
               <div class="star verline">&#10072;</div>
               <div class="star rate-num">${rating.saleNum}</div>
            </div>
            <h4>$${price}</h4>
            </div>
                   <div class="buttons">
                   <i onclick="decrement(${id})" class="bi bi-dash-square"></i>
                   <div id=${id} class="quantity">
                   ${searchProItem.item === undefined? 0: searchProItem.item}
                   </div>
                   <i onclick="increment(${id})" class="bi bi-plus-square"></i>
                   </div>
           </div> `;

   }).join(""));

   }

   generateShop();

  
  
 // create a increment function
   let increment = (proId)=>{
      let selectedItem =proId;
      let searchItem = basket.find((pro)=>pro.id === selectedItem.id)
      if(searchItem === undefined){
          basket.push(
              {
                  id:selectedItem.id,
                  item:1
              }
          )
      }else{
          searchItem.item+=1;
      }
  
      update(selectedItem.id);
  
      localStorage.setItem("proData",JSON.stringify(basket))
      };
  
      // create a decrement function
      let decrement = (proId)=>{
          let selectedItem =proId;
          let searchItem = basket.find((pro)=> pro.id === selectedItem.id);
  
          if(searchItem === undefined) return;
  
          else if(searchItem.item === 0) return;
  
          else{
              searchItem.item -=1;
          }
  
          update(selectedItem.id);
  
          basket = basket.filter((proZero) => proZero.item !== 0);
  
          localStorage.setItem("proData",JSON.stringify(basket))
      };
  
  
      // create a update function
      let update = (proId)=>{
          let searchItem = basket.find((pro)=>pro.id === proId)
      
          document.getElementById(proId).innerHTML=searchItem.item;
          calculation();
          calculationTwo();
      };
  
  
      // create a calculation function
      let calculation =()=>{
          let cartIcon = document.querySelector(".cartAmount");
          
          cartIcon.textContent = basket.map((pro)=> pro.item).reduce((pre,curr)=> pre + curr, 0);
      }

      calculation();

// create calculation function for mobile device update
      let calculationTwo=()=>{
        let cartIconTwo = document.querySelector(".cartAmountTwo");
          
        cartIconTwo.textContent = basket.map((pro)=> pro.item).reduce((pre,curr)=> pre + curr, 0);
      }

      calculationTwo();





// write a code for mobile navbar

const bar = document.getElementById("bar");

const nav = document.getElementById("navbar");

const close = document.getElementById("close");


if(bar){
bar.addEventListener("click",()=>{
   nav.classList.add("active")
})
}

if(close){
   close.addEventListener("click",()=>{
      nav.classList.remove("active")
   })
   }
   


// write a code for Featured Products section slider
let count = 0;

let inc = 0;  

let margin = 0;

let slider = document.getElementsByClassName("slider-width")[0];

let itemDisplay = 0;

if(screen.width > 990){
    itemDisplay = document.getElementsByClassName("slider-container")[0].getAttribute("item-display-d")
    margin = itemDisplay * 5;
 }
 
 if(screen.width > 700 && screen.width < 990 ){
    itemDisplay = document.getElementsByClassName("slider-container")[0].getAttribute("item-display-t")
    margin = itemDisplay * 6.8;
 }
 if(screen.width > 280 && screen.width < 700 ){
    itemDisplay = document.getElementsByClassName("slider-container")[0].getAttribute("item-display-m")
    margin = itemDisplay * 20;
 }

 let item = document.getElementsByClassName("item")

 let itemLeft = item.length % itemDisplay;

 let itemSlide = Math.floor(item.length / itemDisplay) - 1

 for (let i= 0; i < item.length; i++) {
    item[i].style.width = screen.width / itemDisplay - margin + "px"
 }

 function next(){
    if(inc !== itemSlide + itemLeft){
        if(inc === itemSlide){
        inc=inc+itemLeft;
        count = count - (screen.width/itemDisplay)*itemLeft
        }else{
            inc++
            count = count - screen.width
        }
    }
    
    slider.style.left =  count + "px"
 }

 function prev(){
    if(inc !== 0 ){
        if(inc === itemLeft){
        inc=inc-itemLeft;
        count = count + (screen.width/itemDisplay)*itemLeft
        }else{
            inc--
            count = count + screen.width
        }
    }
    slider.style.left =  count + "px"

 }




// write a code for sign in and sign up form  page

// get form elements
const formOpenBtn = document.querySelector("#form-open"),
home = document.querySelector(".home"),
formContainer = document.querySelector(".form-container"),
formCloseBtn = document.querySelector(".form-close"),
signupBtn = document.querySelector("#signup"),
loginBtn = document.querySelector("#login"),
pwShowHide = document.querySelectorAll(".pw-hide");


// create a function for formOpenBtn
formOpenBtn.addEventListener("click", () =>{
  home.classList.add("show");
  nav.classList.remove("active")
});


// create a function for formCloseBtn
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));


// create a function for show or hide password
pwShowHide.forEach((icon) => {
icon.addEventListener("click", () => {
  let getPwInput = icon.parentElement.querySelector("input");
  if (getPwInput.type === "password") {
    getPwInput.type = "text";
  } else {
    getPwInput.type = "password";
  }
});
});


// addEventListener on signupBtn
signupBtn.addEventListener("click", (e) => {
e.preventDefault();
formContainer.classList.add("active");
});

// addEventListener on loginBtn
loginBtn.addEventListener("click", (e) => {
e.preventDefault();
formContainer.classList.remove("active");
});



// create a validateLoginForm function
function validateLoginForm(){
// get LoginForm input elements
let logEmail=document.querySelector("#logEmail");
let logPass = document.querySelector("#logPass");

 // log in email
if(logEmail.value.trim() === ""){
setError(logEmail,"Email can't be blank")
}else if(isEmailValid(logEmail.value)){
 setSuccess(logEmail);
}else{
 setError(logEmail,"Provide valid Email address");
}

// log in password
if(logPass.value.trim() === ""){
setError(logPass,"Password can't be blank");
}else if(logPass.value.trim().length < 6|| logPass.value.trim().length > 10){
  setError(logPass,"Password min 6 and max 10 charecters");
}else{
setSuccess(logPass);
window.location.assign("index.html");
}

}


// create a validateSignupForm function
function validateSignupForm(){
// get SignupForm input elements
let signupEmail=document.querySelector("#signupEmail");
let signupPass = document.querySelector("#signupPass");
let signupCpass = document.querySelector("#signupCpass");

// sign up email
if(signupEmail.value.trim() === ""){
  setError(signupEmail,"Email can't be blank")
}else if(isEmailValid(signupEmail.value)){
   setSuccess(signupEmail);
}else{
   setError(signupEmail,"Provide valid Email address");
}

// sign up password
if(signupPass.value.trim() === ""){
  setError(signupPass,"Password can't be blank");
}else if(signupPass.value.trim().length < 6|| signupPass.value.trim().length > 10){
    setError(signupPass,"Password min 6 and max 10 charecters");
}else{
 setSuccess(signupPass);
}

 // sign up confirm password
 if(signupCpass.value.trim() === ""){
  setError(signupCpass,"Password can't be blank");
 }else if(signupCpass.value !== signupCpass.value){
    setError(signupCpass,"Password does not match")
 }else{
     setSuccess(signupCpass);
     window.location.assign("index.html");
 }
}


// create a setError message function 
function setError(element,errorMessage){
const parent = element.parentElement;
if(parent.classList.contains("successs")){
    parent.classList.remove("successs")
}
parent.classList.add("errorr");
const paragraph = parent.querySelector("p");
paragraph.textContent = errorMessage;
}


// create a setSucces message function 
function setSuccess(element,errorMessage){
const parent = element.parentElement;
if(parent.classList.contains("errorr")){
 parent.classList.remove("errorr");
}
parent.classList.add("successs");
}

// this function is create for email validation
function isEmailValid(email){
const reg =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return reg.test(email);
}



