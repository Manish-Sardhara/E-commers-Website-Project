
  // write a code for show cart item
   let basket = JSON.parse(localStorage.getItem("proData")) || [];

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
