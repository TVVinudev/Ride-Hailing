let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded',()=>{
    setTimeout(()=>{
        logoSpan.forEach((span,index)=>{
            setTimeout(()=>{
                span.classList.add('active');
            },(index+1)*400)
        });

        setTimeout(()=>{
            logoSpan.forEach((span,index)=>{
                setTimeout(()=>{
                    span.classList.remove('active');
                    span.classList.add('fade')
                },(index+1)*50);
            })
        },2000);


        setTimeout(()=>{
            intro.style.top='-100vh';
        },2300)


    })
})



///change background

const backgroundImages = [

    "url('../images/bg1.jpg')", 

    "url('../images/bg2.jpg')", 

    "url('../images/bg3.jpg')"

];

let currentImageIndex = 0;

function changeBackgroundImage() {

    const backgroundElement = document.getElementById("background-image");

    backgroundElement.style.backgroundImage = backgroundImages[currentImageIndex];

    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;

}

setInterval(() => {
    changeBackgroundImage();
}, 1000);
// Change image every 5 seconds

