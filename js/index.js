// aside
$('.close').click(function(){
  closeAside()
    
   
 })

 
 $('.menu').click(function(){
    $('.close').css("display", "block")
    $('.menu').css("display", "none")
    $('aside').animate({left: '0'},500)
    for (let i = 0; i < 5; i++) {
        $(".categ li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
    
   
});

// html elements
const yummy=document.querySelector('.yummy .row')
const yummySec=document.querySelector('.yummy')
const cat=document.querySelector('#cat')
const categories=document.querySelector('.categories .row')
const categorySec=document.querySelector('.categories')
const detailsSec=document.querySelector('.details')
const details=document.querySelector('.details .row')
const area=document.querySelector('.area .row')
const areaSec=document.querySelector('.area')
const areaBtn=document.querySelector('#areaBtn')
const ingredients=document.querySelector('.ingredients .row')
const ingredientsSec=document.querySelector('.ingredients')
const ingredientsBtn=document.querySelector('#ingredientsBtn')
const searchBtn=document.querySelector('#searchBtn')
const searchSec=document.querySelector('.search')
const nameSearch=document.querySelector('#nameSearch')
const letterSearch=document.querySelector('#letterSearch')
const contactBtn=document.querySelector('#contactBtn')
const contactSec=document.querySelector('#contact')
const nameInput=document.querySelector('#nameInput')
const ageInput=document.querySelector('#ageInput')
const passwordInput=document.querySelector('#passwordInput')
const repasswordInput=document.querySelector('#repasswordInput')
const phoneInput=document.querySelector('#phoneInput')
const submitBtn=document.querySelector('#submitBtn')
const emailInput=document.querySelector('#emailInput')
const loadingScreen=document.querySelector('.loading')




// variables
let nflag=false
let eflag=false
let aflag=false
let pflag=false
let pwflag=false
let reflag=false




// functions
function check(){
    if (nflag&&eflag&& pflag&&pwflag&&reflag&&aflag)
    {
        submitBtn.removeAttribute("disabled")
    }
    else{
        submitBtn.setAttribute("disabled", true)
    }
}


function closeAside(){
    $(".categ li").animate({
        top: 200
    }, 500)
    $('.close').css("display", "none")
    $('.menu').css("display", "block")
    $('aside').animate({left: '-225px'},500)
}

async function getMeals(){
    
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let data= await response.json()
    return data.meals
    
    
    // console.log(meals)

}

async function displayMeales(arr){
    let box=''
  
    for(let i=0;i<arr.length;i++){
box+=`  <div id='${arr[i].idMeal
}' class="col-md-3">
<div class="item">
    <div class="img-item overflow-hidden position-relative">
        <img class="img-fluid rounded-3" src="${arr[i]. strMealThumb}" alt="">
        <div class="white-screen d-flex overflow-hidden align-items-center position-absolute  rounded-3 p-3">
            <h4 class="text-dark ">${arr[i].strMeal}</h4>
                                </div>
    </div>
   
</div>
</div>`
   
}
    yummy.innerHTML=box

    let mealCards=yummy.querySelectorAll('.col-md-3')
    
    catCards=Array.from(mealCards)
    // console.log(mealCards)
    for(let i=0;i<mealCards.length;i++){

        mealCards[i].addEventListener('click',async function(){
            scroll(0, 0);
// console.log(this.id)
getDetails(this.id)
detailsSec.classList.replace('d-none','d-block')
yummySec.classList.replace('d-block','d-none')
       })
    }
} 


async function getCat(){
    const response= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    const data=await response.json()
    console.log(data.categories)
    return data.categories
}



async function displayCat(){
    let box=''
   allCat= await getCat()
     for(let i=0;i<allCat.length;i++){
 box+=`   <div class="col-md-3">
 <div class="item">
     <div class="img-item overflow-hidden position-relative">
         <img class="w-100 rounded-3" src="${allCat[i].strCategoryThumb}" alt="">
         <div class="white-screen text-center position-absolute  rounded-3 ">
             <h3 class="text-dark cat-title">${allCat[i].strCategory}</h3>
             <p>${allCat[i].strCategoryDescription}</p>
                                 </div>
     </div>
    
 </div>
</div>`
     }
     categories.innerHTML=box
     let catCards=categorySec.querySelectorAll('.col-md-3')
    
     catCards=Array.from(catCards)
     // console.log(catCards)
     for(let i=0;i<catCards.length;i++){
         catCards[i].addEventListener('click',async function(){
            scroll(0, 0);
 // console.log(this.querySelector('.cat-title').innerHTML )
 let categoryName=this.querySelector('.cat-title').innerHTML.trim()
 $('.loading').css('display','flex')
 await filterByCat(`${categoryName}`)
 $('.loading').css('display','none')
 yummySec.classList.replace('d-none','d-block')
     categorySec.classList.replace('d-block','d-none')
    
         })
     }
}

async function filterByCat(catName){
const response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`)
const data= await response.json()
const meals=data.meals
await displayMeales(meals)
}

async function getDetails(id){
    $('.loading').css('display','flex')
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data=await response.json()
   displayDetails(data.meals[0])
 
   $('.loading').css('display','none')
}

function closeDetailes(){
    yummySec.classList.replace('d-none','d-block')
detailsSec.classList.replace('d-block','d-none')
}

async function displayDetails(obj){
    let box=''
    
  console.log(obj)

        let ingredientslist=``
        for (let j = 1; j <=20; j++) {
           
            if (obj[`strIngredient${j}`]!='') {
            
               ingredientslist += `<li class="alert alert-info m-2 p-1">${obj[`strMeasure${j}`]} ${obj[`strIngredient${j}`]}</li>`
               
            }
        }
        
        let tags = obj.strTags?.split(",")
        
        if (!tags) tags = []
    
        let tagsStr = ''
        for (let i = 0; i < tags.length; i++) {
            tagsStr += `
            <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
        }
    
        box=` <div class="d-flex justify-content-end">
       <a  onclick="closeDetailes()"><i class="fa-solid text-white  open-close-icon text-black fa-2x fa-x  " ></i></a> 
       
    </div>
    <div class="col-md-4 text-white ">
<img src="${obj.strMealThumb}" class="img-fluid rounded-3" alt="">
<h3 class="my-3">${obj.strMeal}</h3>
    </div>
    <div class="col-md-8 text-white">
        <h2>Instructions</h2>
<p>${obj.
    strInstructions}</p>
    
<h3>Area : ${obj.strArea}
   </h3>
    <h3> Category : ${obj.strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="d-flex flex-wrap g-3 gap-3 my-3">
    ${ingredientslist}
    </ul>


    <h3> Tags :</h3>
    <ul class="d-flex g-3 flex-wrap">
                    
  ${tagsStr}
                </ul>
                <a target="_blank" href="${obj.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${obj.strYoutube}" class="btn btn-danger">Youtube</a>
</div>`
    
details.innerHTML=box
}

async function getArea(){
    const response= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    const data=await response.json()
    console.log(data.meals)
    displayArea( data.meals)
}



function displayArea(arr){
let box=''
for(let i=0;i<arr.length;i++){
    box+=`  <div class="col-md-3 justify-content-center align-items-center d-flex">
    <div class="area-content text-white">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${arr[i].
strArea}</h3>
    </div>
   

</div>`
}
area.innerHTML=box

let areaCards=area.querySelectorAll('.col-md-3')
areaCards=Array.from(areaCards)
for(let i=0;i<areaCards.length;i++){
    areaCards[i].addEventListener('click',async function(){
        scroll(0, 0);
        let areaName=areaCards[i].querySelector('h3').innerHTML
        $('.loading').css('display','flex')
       await filterByArea(areaName)
       $('.loading').css('display','none')
       yummySec.classList.replace('d-none','d-block')
       areaSec.classList.replace('d-block','d-none')
    })
}

}

async function filterByArea(areaName){
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
    const data= await response.json()
    const meals=data.meals
    console.log(data)
    await displayMeales(meals)
    }

    async function getIngredients(){
        const response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        const data= await response.json()
        console.log (data.meals)
        displayingredients(data.meals)
    }

async function displayingredients(arr){
    let box=''
    for(let i=0;i<arr.length;i++){
        
        if(arr[i].strDescription!=null && arr[i].strDescription!=''){
            let words = arr[i].strDescription.split(" ");
            let shortenedParagraph = words.slice(0,10).join(" ");
             box+=`
<div class="col-md-3">
<div class="ingredients-content text-center text-white">
    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
    <h3>${arr[i].strIngredient}</h3>
    <p>${shortenedParagraph}
    </p>
</div>
       
    </div>
`

        }
        else{
continue;
        }
       

    }
    ingredients.innerHTML=box
    let ingredientsCards=ingredients.querySelectorAll('.col-md-3')
    ingredientsCards=Array.from(ingredientsCards)
   
    for(let i=0;i<ingredientsCards.length;i++){
        ingredientsCards[i].addEventListener('click',async function(){

            // console.log(ingredientsCards[i].querySelector('h3').innerHTML)
            $('.loading').css('display','flex')
          await  filterByIngeridients(ingredientsCards[i].querySelector('h3').innerHTML)
            ingredientsSec.classList.replace('d-block','d-none')
            yummySec.classList.replace('d-none','d-block')
            $('.loading').css('display','none')

        })
    }
}


async function filterByIngeridients(ingeridentsName){
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingeridentsName}`)
    const data= await response.json()
    const meals=data.meals
    console.log(data)
    await displayMeales(meals)

    }


async function searchByName(name){
   
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    const data=await response.json()

   await displayMeales(data.meals)
   yummySec.classList.replace('d-none','d-block')
   

}


async function searchByLetter(letter){
   
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    const data=await response.json()

   await displayMeales(data.meals)
   yummySec.classList.replace('d-none','d-block')
   
  
 
}

function nameRegex(name){
let regex=/^[A-Za-z\s]+$/;
return regex.test(name)
}

function emailRegex(email){
    let regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
    }

    function phoneRegex(phone){
        let regex=/^01[0125][0-9]{8}$/;
        return regex.test(phone)
        }

        function ageRegex(age){
            let regex= /^(?:0|[1-9]\d?|1[0-4]\d|150)$/;
            return regex.test(age)
        }
    

        function passwordRegex(password){
            let regex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

            return regex.test(password)
            }
                  
// EventListener

document.addEventListener('DOMContentLoaded',async function(){
    $('.loading').css('display','flex')
    yummySec.classList.replace('d-none','d-block')
    let arr= await getMeals()
    await displayMeales(arr)
    $('.loading').css('display','none')
    })
 

cat.addEventListener('click',async function(){
    $('.loading').css('display','flex')
yummySec.classList.replace('d-block','d-none')
    categorySec.classList.replace('d-none','d-block')
    areaSec.classList.replace('d-block','d-none')
    ingredientsSec.classList.replace('d-block','d-none')
    searchSec.classList.replace('d-block','d-none')
    contactSec.classList.replace('d-block','d-none')
    closeAside()
    await displayCat()
    $('.loading').css('display','none')
 
})

areaBtn.addEventListener('click',async function(){
    $('.loading').css('display','flex')
    closeAside()
    
    areaSec.classList.replace('d-none','d-block')
    yummySec.classList.replace('d-block','d-none')
    categorySec.classList.replace('d-block','d-none')
    ingredientsSec.classList.replace('d-block','d-none')
    searchSec.classList.replace('d-block','d-none')
    contactSec.classList.replace('d-block','d-none')
    await getArea()
    $('.loading').css('display','none')
   
})

ingredientsBtn.addEventListener('click',async function(){
    $('.loading').css('display','flex')
    closeAside()
    ingredientsSec.classList.replace('d-none','d-block')
    yummySec.classList.replace('d-block','d-none')
    categorySec.classList.replace('d-block','d-none')
    areaSec.classList.replace('d-block','d-none')
    searchSec.classList.replace('d-block','d-none')
    contactSec.classList.replace('d-block','d-none')
    await getIngredients()
    $('.loading').css('display','none')
})

searchBtn.addEventListener('click',function(){
    closeAside()
    
    searchSec.classList.replace('d-none','d-block')
    ingredientsSec.classList.replace('d-block','d-none')
    yummySec.classList.replace('d-block','d-none')
    categorySec.classList.replace('d-block','d-none')
    areaSec.classList.replace('d-block','d-none')
    contactSec.classList.replace('d-block','d-none')
})

nameSearch.addEventListener('input',async function(){
    if(nameSearch.value==''){
        yummySec.classList.replace('d-block','d-none')
    }
    else{
        await searchByName(nameSearch.value)

    }

})

letterSearch.addEventListener('input',async function(){
    if(letterSearch.value==''){
        yummySec.classList.replace('d-block','d-none')
    }
    else{
        await searchByLetter(letterSearch.value)
    }
   
})

contactBtn.addEventListener('click',function(){
    closeAside()
    contactSec.classList.replace('d-none','d-block')
    searchSec.classList.replace('d-block','d-none')
    ingredientsSec.classList.replace('d-block','d-none')
    yummySec.classList.replace('d-block','d-none')
    categorySec.classList.replace('d-block','d-none')
    areaSec.classList.replace('d-block','d-none')

})



nameInput.addEventListener('input',function(){
    if(nameInput.value==''|| !nameRegex(nameInput.value)){
        nameInput.nextElementSibling.classList.replace('opacity-0','opacity-1')
        nflag=false
        check()
    }
    else{
        nameInput.nextElementSibling.classList.replace('opacity-1','opacity-0')
        nflag=true
        check()
    }
})

emailInput.addEventListener('input',function(){

    if(emailInput.value==''|| !emailRegex(emailInput.value)){
        emailInput.nextElementSibling.classList.replace('opacity-0','opacity-1')
        eflag=false
        check()
    }
    else{
        emailInput.nextElementSibling.classList.replace('opacity-1','opacity-0')
        eflag=true
        check()
    }
})

phoneInput.addEventListener('input',function(){

    if(phoneInput.value==''|| !phoneRegex(phoneInput.value)){
        phoneInput.nextElementSibling.classList.replace('opacity-0','opacity-1')
        pflag=false
        check()
    }
    else{
        phoneInput.nextElementSibling.classList.replace('opacity-1','opacity-0')
        pflag=true
        check()
    }
})


ageInput.addEventListener('input',function(){

    if(ageInput.value==''|| !ageRegex(ageInput.value)){
        ageInput.nextElementSibling.classList.replace('opacity-0','opacity-1')
        aflag=false
        check()
    }
    else{
        ageInput.nextElementSibling.classList.replace('opacity-1','opacity-0')
        aflag=true
        check()
    }
})

passwordInput.addEventListener('input',function(){

    if(passwordInput.value==''|| !passwordRegex(passwordInput.value)){
        passwordInput.nextElementSibling.classList.replace('opacity-0','opacity-1')
        pwflag=false
        check()
    }
    else{
        passwordInput.nextElementSibling.classList.replace('opacity-1','opacity-0')
        pwflag=true
        check()
    }
})

repasswordInput.addEventListener('input',function(){

    if(repasswordInput.value==''|| repasswordInput.value!=passwordInput.value){
        repasswordInput.nextElementSibling.classList.replace('opacity-0','opacity-1')
       reflag=false
       check()
    }
    else{
        repasswordInput.nextElementSibling.classList.replace('opacity-1','opacity-0')
        reflag=true
        check()
    }
})

submitBtn.addEventListener('click',function(){
    passwordInput.value=''
    nameInput.value=''
    repasswordInput.value=''
    phoneInput.value=''
    emailInput.value=''
    ageInput.value=''
})


 
     