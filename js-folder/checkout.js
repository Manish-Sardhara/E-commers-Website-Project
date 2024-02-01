let label = document.getElementById("label");

let shoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("proData")) || [];




// create a calculation function
let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    
    cartIcon.textContent = basket.map((pro)=> pro.item).reduce((pre,curr)=> pre + curr, 0)
}

calculation();

// create calculation function for mobile device update

let calculationTwo=()=>{
    let cartIconTwo = document.querySelector(".cartAmountTwo");
    
    cartIconTwo.textContent = basket.map((pro)=> pro.item).reduce((pre,curr)=> pre + curr, 0);
}

calculationTwo();


// create a  generateCartItem function
let generateCartItem = () =>{
    if(basket.length !== 0 ){

    return (shoppingCart.innerHTML=basket.map((pro)=>{
        let {id,item} = pro;
        let searchProI = shopItemData.find((proD) => proD.id === id) || [];
        return `
        <div class="cart-item">
        <img width="130" src="${searchProI.img}">
        <div class="details">

        <div class="title-price-x">
            <h4 class="title-price">
            <p>${searchProI.name}</p>
            <p class="cart-item-price">$ ${searchProI.price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-square"></i>
        </div>
         
        <div class="buttons"> 
        <div id=${id} class="quantity">${item}</div>
        </div>
         
        <h3>$ ${item * searchProI.price}</h3>
        </div>
        </div>
        `;
    }).join(""))

    }else{
    shoppingCart.innerHTML=`
    `;
    
    label.innerHTML=`
    `; 
    }
}

generateCartItem();


// create a increment function
let increment = (proId)=>{
    let selectedItem =proId;
    let searchItem = basket.find((pro)=>pro.id === selectedItem.id)

    if(searchItem === undefined){
    basket.push(
        {
            id:selectedItem.id,
            item:1,
        }
        )
    }else{
    searchItem.item+=1;
    }

    generateCartItem();

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

    generateCartItem();

    localStorage.setItem("proData",JSON.stringify(basket))
};


// create a update function
let update = (proId)=>{
    let searchItem = basket.find((pro)=>pro.id === proId)

    document.getElementById(proId).innerHTML=searchItem.item;
    calculation();
    calculationTwo();
    totalAmount();
};


// create a remove cart function
let removeItem = (proId)=>{
let selectedItem = proId;

basket = basket.filter((productId)=>productId.id !== selectedItem.id);

generateCartItem();

totalAmount();

calculation();

calculationTwo();

localStorage.setItem("proData",JSON.stringify(basket))
}


// create a clearCart function
let clearCart = ()=>{
    
    basket=[];
    generateCartItem();
    calculation();
    calculationTwo();
    localStorage.setItem("proData",JSON.stringify(basket))
}



// create a total amount function
let totalAmount = ()=>{

    if(basket.length !== 0){

        let amount = basket.map((pro) => {

            let {item,id}=pro;

            let searchProI = shopItemData.find((proD) => proD.id === id) || [];

            return item * searchProI.price;
        }).reduce((pre,curr)=> pre+curr,0)
        // console.log(amount)

        label.innerHTML =`
        <div class="price-con check-price">
        <h2>Order Total : $ ${amount}</h2>
        </div>`;
        
    }else return;
}

totalAmount();





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





// check out page validation
let sunForm = document.querySelector("#checkOut-Form");
let checkInputName = document.querySelector("#checkInputName");
let checkInputEmail = document.querySelector("#checkInputEmail");
let checkInputAdd = document.querySelector("#checkInputAdd");
let checkInputCity = document.querySelector("#checkInputCity");
let checkInputState = document.querySelector("#checkInputState");
let checkInputZip = document.querySelector("#checkInputZip");
let checkInputCardName = document.querySelector("#checkInputCardName");
let checkInputCardNum = document.querySelector("#checkInputCardNum");
let checkInputExMonth = document.querySelector("#checkInputExMonth");
let checkInputExYear = document.querySelector("#checkInputExYear");
let checkInputCvNum = document.querySelector("#checkInputCvNum");

sunForm.addEventListener("submit",(e)=>{
    checkOutPageVal();


    if(isFormValid()==true){
        sunForm.submit();
        clearCart();
      }else{
       // window.location.assign("index.html");
          e.preventDefault();
      }

    // window.location.assign("index.html");
});

function isFormValid(){
    const inputContainer = sunForm.querySelectorAll(".inputBox");
    let result = true
   inputContainer.forEach((container)=>{
    if(container.classList.contains("errorC")){
      result=false;
    }
   })
   return result;
  }


function checkOutPageVal(){

    //checkInputName

    if(checkInputName.value.trim() === ""){
        setErrorC(checkInputName, "Name Can not be empty");
    }else if(checkInputName.value.trim().length < 5 || checkInputName.value.trim().length > 15){
       setErrorC(checkInputName,"Name must be min 5 and max 15 charecters");
    }else{
        setSuccessC(checkInputName);
    }

  
    //checkInputEmail

    if(checkInputEmail.value.trim() === ""){
        setErrorC(checkInputEmail,"Provide email address")
     }else if(isEmailValidC(checkInputEmail.value)){
         setSuccessC(checkInputEmail);
     }else{
         setErrorC(checkInputEmail,"Provide valid email address");
     }

      //checkInputAdd

      if(checkInputAdd.value.trim() === ""){
        setErrorC(checkInputAdd, "Address Can not be empty");
    }else{
        setSuccessC(checkInputAdd)
    }

     //checkInputCity

     if(checkInputCity.value.trim() === ""){
        setErrorC(checkInputCity, "City Can not be empty");
    }else if(checkInputCity.value.trim().length < 3 || checkInputCity.value.trim().length > 15){
       setErrorC(checkInputCity,"City must be min 3 and max 15 charecters");
    }else{
        setSuccessC(checkInputCity);
    }

     //checkInputState

     if(checkInputState.value.trim() === ""){
        setErrorC(checkInputState, "State Can not be empty");
    }else if(checkInputState.value.trim().length <= 2 || checkInputState.value.trim().length > 15){
       setErrorC(checkInputState,"State must be min 3 and max 15 charecters");
    }else{
        setSuccessC(checkInputState)
    }

    //checkInputZip

    if(checkInputZip.value.trim() === ""){
        setErrorC(checkInputZip, "Zip Code Can not be empty");
    }else if(checkInputZip.value.trim().length < 4 || checkInputZip.value.trim().length > 5){
       setErrorC(checkInputZip,"Zip Code must be 5 digit");
    }else{
        setSuccessC(checkInputZip)
    }

    // checkInputCardName

    if(checkInputCardName.value.trim() === ""){
        setErrorC(checkInputCardName, "Name Can not be empty");
    }else if(checkInputCardName.value.trim().length < 5 || checkInputCardName.value.trim().length > 15){
       setErrorC(checkInputCardName,"Name must be min 5 and max 15 charecters");
    }else{
        setSuccessC(checkInputCardName);
    }

       // checkInputCardNum
       
       if(checkInputCardNum.value.trim() === ""){
        setErrorC(checkInputCardNum, "Card Digit Can not be empty");
    }else if(IsMatchingCard(checkInputCardNum.value)){
        setSuccessC(checkInputCardNum)
    }else{
        setErrorC(checkInputCardNum,"Provide a valid card digit");
    }

     // checkInputExMonth

      if(checkInputExMonth.value.trim() === ""){
        setErrorC(checkInputExMonth, "Month Name Can not be empty");
    }else if(checkInputExMonth.value.trim().length < 2 || checkInputExMonth.value.trim().length > 10){
       setErrorC(checkInputExMonth,"Month Name must be min 3 and max 10 charecters");
    }else{
        setSuccessC(checkInputExMonth)
    }


       // checkInputExYear

       if(checkInputExYear.value.trim() === ""){
        setErrorC(checkInputExYear, "Year Can not be empty");
    }else if(checkInputExYear.value.trim().length < 4 || checkInputExYear.value.trim().length > 4){
       setErrorC(checkInputExYear,"Year must be 4 digit");
    }else{
        setSuccessC(checkInputExYear)
    }


        // checkInputCvNum

        if(checkInputCvNum.value.trim() === ""){
            setErrorC(checkInputCvNum, "CVV Digit Can not be empty");
        }else if(checkInputCvNum.value.trim().length < 3 || checkInputCvNum.value.trim().length > 3){
           setErrorC(checkInputCvNum,"CVV must be 3 digit");
        }else{
            setSuccessC(checkInputCvNum);
            window.location.assign("index.html");
        }

}

// create a setError message function 
function setErrorC(element,errorMessage){
    const parent = element.parentElement;
    if(parent.classList.contains("successC")){
        parent.classList.remove("successC")
    }
    parent.classList.add("errorC");
    const paragraph = parent.querySelector("p");
    paragraph.textContent = errorMessage;
}

// create a setSuccess message function 
function setSuccessC(element,errorMessage){
   const parent = element.parentElement;
   if(parent.classList.contains("errorC")){
    parent.classList.remove("errorC");
}
   parent.classList.add("successC");
}

// this function is create for email validation
function isEmailValidC(email){
  const reg =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

// this function is create for card validation
function IsMatchingCard(str){
    var myRegExp =  /[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4}/;
    return myRegExp.test(str)
}