document.addEventListener('DOMContentLoaded', function () {
    // Select the header element
    const header = document.querySelector('header');
 
 
 // Toggle between dark and light modes
 const modeToggle = document.getElementById('mode-toggle');
 modeToggle.addEventListener('click', () => {
     document.body.classList.toggle('dark-mode');
     modeToggle.classList.toggle('dark-mode');
 });

 // Add scroll event listener to toggle fixed class
 window.addEventListener('scroll', function () {
     // Use the defined 'header' variable instead of 'header'
     if (window.scrollY > header.offsetHeight) {
         document.body.classList.add('fixed-toggle');
     } else {
         document.body.classList.remove('fixed-toggle');
     }
 });
});