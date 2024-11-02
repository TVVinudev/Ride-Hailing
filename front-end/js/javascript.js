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








document.addEventListener('DOMContentLoaded', function () {
    const statsTab = document.getElementById('stats-tab');
    const aboutTab = document.getElementById('about-tab');
    const statsContent = document.getElementById('stats');
    const aboutContent = document.getElementById('about');
    const tabsDropdown = document.getElementById('tabs');

    // For larger screens (with buttons)
    statsTab.addEventListener('click', function () {
        statsContent.classList.remove('hidden');
        aboutContent.classList.add('hidden');
        statsTab.setAttribute('aria-selected', 'true');
        aboutTab.setAttribute('aria-selected', 'false');
    });

    aboutTab.addEventListener('click', function () {
        aboutContent.classList.remove('hidden');
        statsContent.classList.add('hidden');
        aboutTab.setAttribute('aria-selected', 'true');
        statsTab.setAttribute('aria-selected', 'false');
    });

    // For smaller screens (with select dropdown)
    tabsDropdown.addEventListener('change', function () {
        if (this.value === 'stats') {
            statsContent.classList.remove('hidden');
            aboutContent.classList.add('hidden');
        } else if (this.value === 'about') {
            aboutContent.classList.remove('hidden');
            statsContent.classList.add('hidden');
        }
    });
});

//Rating star

const stars = document.querySelectorAll('.star');
const result = document.getElementById('result');
let ratingValue = 0;

// Hover functionality to preview rating without locking in
stars.forEach(star => {
    star.addEventListener('mouseover', function () {
        const hoverValue = this.getAttribute('data-value');
        highlightStars(hoverValue);  // Temporarily highlight stars based on hover
    });

    star.addEventListener('mouseout', function () {
        highlightStars(ratingValue); // Revert to locked rating when hover ends
    });
});

// Add click event for stars to lock the selected rating
stars.forEach(star => {
    star.addEventListener('click', function () {
        ratingValue = this.getAttribute('data-value');  // Get the rating value from the clicked star
        highlightStars(ratingValue);  // Lock the stars up to the clicked rating
    });
});

// Function to highlight stars based on rating
function highlightStars(value) {
    stars.forEach((star, index) => {
        if (index < value) {
            star.classList.add('filled');
            star.classList.add('text-yellow-400');  // Use Tailwind's yellow color for filled stars
        } else {
            star.classList.remove('filled');
            star.classList.remove('text-yellow-400'); // Remove filled class for unselected stars
        }
    });
}

// Handle submit button click
document.getElementById('submit').addEventListener('click', function () {
    const comment = document.getElementById('comment').value;  // Get comment text
    if (ratingValue === 0) {
        result.innerHTML = `<p class="text-red-600">Please select a star rating before submitting.</p>`;
    } else {
        result.innerHTML = `<p class="text-gray-600">You rated <strong>${ratingValue} stars</strong> with the comment:</p>
                            <p class="italic">"${comment}"</p>`;
    }
});


