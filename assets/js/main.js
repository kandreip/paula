/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== QUESTIONS ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.questions__item')

accordionItems.forEach((item) =>{
    const accordionHeader = item.querySelector('.questions__header')

    accordionHeader.addEventListener('click', () =>{
        const openItem = document.querySelector('.accordion-open')

        toggleItem(item)

        if(openItem && openItem!== item){
            toggleItem(openItem)
        }
    })
})

const toggleItem = (item) =>{
    const accordionContent = item.querySelector('.questions__content')

    if(item.classList.contains('accordion-open')){
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
    }else{
        accordionContent.style.height = accordionContent.scrollHeight + 'px'
        item.classList.add('accordion-open')
    }

}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 400 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 400) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'



// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
  

}


// Hide logo on dark mode
function hideLogo () {
    if (document.body.classList.contains(darkTheme)) {
        document.getElementsByClassName('home__logo').item(0).style.display = "none"
    } else {
        document.getElementsByClassName('home__logo').item(0).style.display = "block"
    }    
}

hideLogo();

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())

    hideLogo();

})


/*=============== Functionality ===============*/
// Insert products to html from json file


async function populate() {

    const requestURL = 'products.json';
    const request = new Request(requestURL);
  
    const response = await fetch(request);
    const jobs = await response.json();
  
    insertProducts(jobs);
    jobDetails();
    applyJob();
  
  }

populate()


function insertProducts (data) {
    const getId = document.querySelectorAll(".product__card");

    // $.getJSON("products.json", function (data) {

        $.each(data.jobs, function (i,f) {

            for (let j=0; j <= i; j++) {


                getId[i].innerHTML = ` 
                    
                        <i class="${f.icon}"></i>
                        <h3 class="product__title">${f.job}</h3>
                        <p class="product__card_location"><i class="fas fa-map-marker-alt"> ${f.location}</i> </p>
                        <p class="product__card_description">${f.description} </p>
                        <div class="product__buttons">
                        <button class="product__button1" id=${f.id}>Detalii</button>
                        <button class="product__button2 js-product__card-apply-btn" id=${f.id}>Aplica</button>
                        </div>    
                `
            }
        })
    // })
}

// insertProducts ();

// function insertProducts () {
//     var jobs = [];
//     const getId = document.querySelectorAll(".product__card");
//     console.log(getId);

//     $.getJSON("products.json", function (data) {

//         $.each(data.jobs, function (i,f) {

//             for (let j=0; j <= i; j++) {


//                 getId[i].innerHTML = ` 
                    
//                         <i class="${f.icon}"></i>
//                         <h3 class="product__title">${f.job}</h3>
//                         <p class="product__card_location"><i class="fas fa-map-marker-alt"> ${f.location}</i> </p>
//                         <p class="product__card_description"><i class="fas fa-list-ul"></i> </p>
//                         <button class="button--flex product__button1" id=${f.id}>Detalii</button>
//                         <button class="button--flex product__button2 js-product__card-apply-btn" id=${f.id}>Aplica</button>
                   
//                 `
//             }
//         })
//     })
// }

// insertProducts ();

// Pagination
$('.page-2').hide();
$('.page-1-btn,.page-2-btn').click(function(){
    $('.page-1,.page-2').toggle();
    $('.page-1-btn,.page-2-btn').toggleClass('active');
    // insertProducts();
    populate();
});

// Adding jobs when click on menu tab - jobs
$('.js-nav-item-job').click(function(){
    // insertProducts();
    populate();
})



function jobDetails () {
    setTimeout(() => {

        // Generate job details window
        const detailsBtn = document.querySelectorAll('.product__button1');
        const jobDetails = document.querySelector('#job__details-pop-up-main');
        const jobPopUp = document.querySelector('.job__details-pop-up');
        const modal = document.querySelector('.modal')
    
        for (let i=0; i < detailsBtn.length; i++) {
    
            detailsBtn[i].addEventListener('click', () =>{
    
                let currentBtnId = detailsBtn[i].id;
    
                $.getJSON("products.json", function (data) {
    
                        jobDetails.innerHTML = `
                        <div class="job__details-content">
                                <div class="job__details-title">
                                    <p>Titlul Jobului</p>
                                    ${data.jobs[detailsBtn[i].id].job}
                                </div>
                                <div class="job__details-location">
                                <p>Locatie</p>
                                ${data.jobs[detailsBtn[i].id].location}
                                </div>
                                
                                <div class="job__details-requirements">
                                <p>Cerinte</p>
                                ${data.jobs[detailsBtn[i].id].requirements}
                                </div>

                                <div class="job__details-description">
                                <p>Responsabilitati</p>
                                ${data.jobs[detailsBtn[i].id].responsabilities}
                                </div>

                                <div class="job__details-benefits">
                                <p>Beneficii</p>
                                ${data.jobs[detailsBtn[i].id].benefits}
                                </div>
                        </div> 
                        <div class="job__details-apply-btn"><button class="button--flex js-job__details-apply-btn">Aplica</button></div>
    
                        `
                })
    
                // getHeader.classList.add('hide');
                // getMain.classList.add('hide');
                // document.body.classList.add('overlay');
                jobPopUp.classList.remove('hide');
                modal.classList.remove('hide');
                // console.log(jobDetails);


                // Job Details - Apply button
                setTimeout(() => {
                    const applyBtns = document.querySelectorAll('.js-job__details-apply-btn');
                    const getDetailsJob = document.querySelector('.job__details-pop-up')
                    const getApplyForm = document.querySelector('.job__apply');
                    // console.log(applyBtns.length)

                    for (let i=0; i < applyBtns.length; i++) {
            
                        applyBtns[i].addEventListener('click', () =>{
                            getDetailsJob.classList.add('hide')
                            getApplyForm.classList.remove('hide');

                        })
                    }

                }, "1000")
                  
            })


        }

        // setTimeout(() => {

        //     // Generate job details window
        //     const applyBtns = document.querySelector('.js-job__details-apply-btn');
        //     const getApplyForm = document.querySelector('.job__apply');
            
        //     if (applyBtns !== null) {
        //         for (let i=0; i < applyBtns.length; i++) {
        
        //             applyBtns[i].addEventListener('click', () =>{
        //                 // console.log(applyBtns.length)
        //                 // document.body.classList.add('overlay');
        //                 getApplyForm.classList.remove('hide');
            
        //             })
        //         }
        //     }
            

        // }, "1000")
        

    }, "1000")
}


function applyJob () {
    setTimeout(() => {

        // Generate job details window
        const applyBtns = document.querySelectorAll('.js-product__card-apply-btn');
        const getApplyForm = document.querySelector('.job__apply');
        const modalApplyForm = document.querySelector('.modal')
        const getJobField = document.querySelector('#job')
        
        
    
        for (let i=0; i < applyBtns.length; i++) {
    
            applyBtns[i].addEventListener('click', () =>{
                // console.log(applyBtns.length)
                // document.body.classList.add('overlay');
                console.log(applyBtns[i].parentNode.parentNode.children[1].textContent)
                getJobField.nextElementSibling.textContent = applyBtns[i].parentNode.parentNode.children[1].textContent;
                getJobField.nextElementSibling.style.display = 'block';
                getApplyForm.classList.remove('hide');
                modalApplyForm.classList.remove('hide')
    
            })
        }
    }, "2000")
}


// Close Apply
const closeIconApply = document.querySelector('.js-job__apply-close');
const jobApplyPopUp = document.querySelector('.job__apply');
const modalApplyPopUp = document.querySelector('.modal')

function closeApplyPopUp () {
    // document.body.classList.remove('overlay');
    jobApplyPopUp.classList.add('hide');
    modalApplyPopUp.classList.add('hide')
}

closeIconApply.addEventListener('click', () =>{
    closeApplyPopUp();
})



// Close Details Pop-Up
const closeIcon = document.querySelector('.js-job__details-pop-up-close');
const jobPopUp = document.querySelector('.job__details-pop-up');
const modal = document.querySelector('.modal');

function closePopUp () {
    // document.body.classList.remove('overlay');
    jobPopUp.classList.add('hide');
    modal.classList.add('hide');
}

closeIcon.addEventListener('click', () =>{
    closePopUp();
})


// Close data protection
const closeIconData = document.querySelector('.js-conf-pop-up-close');
const jobPopUpData = document.querySelector('.conf-pop-up');
const modalPopUpData = document.querySelector('.modal');
const closeBtnData = document.querySelector('.js-conf-pop-up-close-btn');

function closePopUpData () {
    // document.body.classList.remove('overlay');
    jobPopUpData.classList.add('hide');
    if ($('.job__apply').hasClass('hide')) {
        modalPopUpData.classList.add('hide');
    } else {
        modalPopUpData.classList.remove('hide');
    }
    // modalPopUpData.classList.add('hide');
}

closeIconData.addEventListener('click', () =>{
    closePopUpData();
})

closeBtnData.addEventListener('click', () =>{
    closePopUpData();
})


// Open data protection
const openIconsData = document.querySelectorAll('.js-data-protection');
const confPopUpData = document.querySelector('.conf-pop-up');
// const modalPopUpData = document.querySelector('.modal')
// console.log(openIconsData)

function openPopUpData () {
    // document.body.classList.remove('overlay');
    jobPopUpData.classList.remove('hide');
    modalPopUpData.classList.remove('hide');
}
openIconsData.forEach((openIconData) => {
    openIconData.addEventListener("click", openPopUpData);    
})

//Contact form
const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

// EmailJs

// listen to the form submission
// const btn = document.getElementById('btn');

// document.getElementById("form-actions").addEventListener("submit", function (event) {
//           event.preventDefault();

//           const serviceID = "service_ciih8ow";
//           const templateID = "template_x7j640c";

//           // send the email here
//           emailjs.sendForm(serviceID, templateID, this).then(
//             (response) => {
//               console.log("SUCCESS!", response.status, response.text);
//               alert("SUCCESS!");
//             },
//             (error) => {
//               console.log("FAILED...", error);
//               alert("FAILED...", error);
//             }
//           );
//         });


// Google translate

// Send button active after checkbox was checked


// Read more and read less from our team
$(document).ready(function(){
    $(".read").click(function(){
       $(this).prev().toggle();
       $(this).siblings('.dots').toggle();
       if($(this).text()=='>>>'){
        $(this).text('<<<');
       } else{
        $(this).text('>>>');
       }
    });

// Send button active after checkbox was checked

    $(function(){
        $(".checkbox").change(function() {
          $(".btn").toggleClass("disabled", this.checked)
        }).change();
      });

 });


 // Add label for each input for a better accessibility

 setTimeout(() => {
    $('#goog-gt-votingInputSrcLang').append('<label for="goog-gt-votingInputSrcLang" style="display:none">Test</label>')
    $('#goog-gt-votingInputTrgLang').append('<label for="goog-gt-votingInputTrgLang" style="display:none">Test2</label>')
    $('#goog-gt-votingInputSrcText').append('<label for="goog-gt-votingInputSrcText" style="display:none">Test3</label>')
    $('#goog-gt-votingInputTrgText').append('<label for="goog-gt-votingInputTrgText" style="display:none">Test4</label>')
    $('#goog-gt-votingInputVote').append('<label for="goog-gt-votingInputVote" style="display:none">Test5</label>')

}, "6000")

 

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal(`.home__data`)
sr.reveal(`.home__img`, {delay: 500})
sr.reveal(`.home__social`, {delay: 600})
sr.reveal(`.about__img, .contact__box`,{origin: 'left'})
sr.reveal(`.about__data, .contact__form`,{origin: 'right'})
sr.reveal(`.steps__card, .questions__group, .footer`,{interval: 100})