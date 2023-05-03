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

function insertProducts () {
    var jobs = [];
    const getId = document.querySelectorAll(".product__card");
    // console.log(getId);

    $.getJSON("products.json", function (data) {

        $.each(data.jobs, function (i,f) {

            for (let j=0; j <= i; j++) {


                getId[i].innerHTML = ` 
                    
                        <i class="${f.icon}"></i>
                        <h3 class="product__title">${f.job}</h3>
                        <p class="product__card_location"><i class="fas fa-map-marker-alt"> ${f.location}</i> </p>
                        <p class="product__card_description"><i class="fas fa-list-ul"></i> </p>
                        <button class="button--flex product__button1" id=${f.id}>Detalii</button>
                        <button class="button--flex product__button2 js-product__card-apply-btn" id=${f.id}>Aplica</button>
                   
                `
            }
        })
    })
}

insertProducts ();


function jobDetails () {
    setTimeout(() => {

        // Generate job details window
        const detailsBtn = document.querySelectorAll('.product__button1');
        const jobDetails = document.querySelector('#job__details-pop-up-main');
        const jobPopUp = document.querySelector('.job__details-pop-up');
    
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
                                <div class="job__details-description">
                                <p>Descriere</p>
                                ${data.jobs[detailsBtn[i].id].description}
                                </div>
                                <div class="job__details-requirements">
                                <p>Cerinte</p>
                                ${data.jobs[detailsBtn[i].id].requirements}
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
                document.body.classList.add('overlay');
                jobPopUp.classList.remove('hide');
                console.log(jobDetails);


                // Job Details - Apply button
                setTimeout(() => {
                    const applyBtns = document.querySelectorAll('.js-job__details-apply-btn');
                    const getDetailsJob = document.querySelector('.job__details-pop-up')
                    const getApplyForm = document.querySelector('.job__apply');
                    console.log(applyBtns.length)

                    for (let i=0; i < applyBtns.length; i++) {
            
                        applyBtns[i].addEventListener('click', () =>{
                            getDetailsJob.classList.add('hide')
                            getApplyForm.classList.remove('hide');

                        })
                    }

                }, "1000")
                  
            })


        }

        setTimeout(() => {

            // Generate job details window
            const applyBtns = document.querySelector('.js-job__details-apply-btn');
            const getApplyForm = document.querySelector('.job__apply');
            
            if (applyBtns !== null) {
                for (let i=0; i < applyBtns.length; i++) {
        
                    applyBtns[i].addEventListener('click', () =>{
                        console.log(applyBtns.length)
                        document.body.classList.add('overlay');
                        getApplyForm.classList.remove('hide');
            
                    })
                }
            }
            

        }, "1000")
        

    }, "1000")
}

jobDetails();


function applyJob () {
    setTimeout(() => {

        // Generate job details window
        const applyBtns = document.querySelectorAll('.js-product__card-apply-btn');
        const getApplyForm = document.querySelector('.job__apply');
        
    
        for (let i=0; i < applyBtns.length; i++) {
    
            applyBtns[i].addEventListener('click', () =>{
                console.log(applyBtns.length)
                document.body.classList.add('overlay');
                getApplyForm.classList.remove('hide');
    
            })
        }
    }, "2000")
}


applyJob ();


// Close Apply
const closeIconApply = document.querySelector('.js-job__apply-close');
const jobApplyPopUp = document.querySelector('.job__apply');

function closeApplyPopUp () {
    document.body.classList.remove('overlay');
    jobApplyPopUp.classList.add('hide');
}

closeIconApply.addEventListener('click', () =>{
    closeApplyPopUp();
})



// Close Details Pop-Up
const closeIcon = document.querySelector('.js-job__details-pop-up-close');
const jobPopUp = document.querySelector('.job__details-pop-up');

function closePopUp () {
    document.body.classList.remove('overlay');
    jobPopUp.classList.add('hide');
}

closeIcon.addEventListener('click', () =>{
    closePopUp();
})


// Close data protection
const closeIconData = document.querySelector('.js-conf-pop-up-close');
const jobPopUpData = document.querySelector('.conf-pop-up');

function closePopUpData () {
    document.body.classList.remove('overlay');
    jobPopUpData.classList.add('hide');
}

closeIconData.addEventListener('click', () =>{
    closePopUpData();
})

// Open data protection
const openIconsData = document.querySelectorAll('.js-data-protection');
const confPopUpData = document.querySelector('.conf-pop-up');
console.log(openIconsData)

function test () {
    console.log('test')
}

openIconsData.forEach((openIconData) => {
    console.log(openIconsData.value)
    // console.log('aaaaaaaa')
    // openIconData.addEventListener("click", () => {
    //     console.log('test')
    // });
    openIconData.addEventListener("click", test);
})


// $('.js-data-protection').click(function () {
//     var storyId = $(this).find("a[href]").attr('href');
//     console.log(storyId);
// });



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
const btn = document.getElementById('btn');

document.getElementById("form-actions").addEventListener("submit", function (event) {
          event.preventDefault();

          const serviceID = "service_ciih8ow";
          const templateID = "template_x7j640c";

          // send the email here
          emailjs.sendForm(serviceID, templateID, this).then(
            (response) => {
              console.log("SUCCESS!", response.status, response.text);
              alert("SUCCESS!");
            },
            (error) => {
              console.log("FAILED...", error);
              alert("FAILED...", error);
            }
          );
        });


// Google translate

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
 });



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
sr.reveal(`.steps__card, .product__card, .questions__group, .footer`,{interval: 100})