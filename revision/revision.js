document.addEventListener('DOMContentLoaded', function () {
    // Select the header element
    const header = document.querySelector('header');
 
 
 // Toggle between dark and light modes
 const modeToggle = document.getElementById('mode-toggle');
 modeToggle.addEventListener('click', () => {
     // Toggle dark mode class
     document.body.classList.toggle('dark-mode');
     modeToggle.classList.toggle('dark-mode');

     // Save the current mode to local storage
     if(document.body.classList.contains('dark-mode')) {
         localStorage.setItem('darkMode', 'enabled');
     } else {
         localStorage.setItem('darkMode', 'disabled');
     }
 });

 // Check local storage for dark mode preference on page load
 if(localStorage.getItem('darkMode') === 'enabled') {
     document.body.classList.add('dark-mode');
     modeToggle.classList.add('dark-mode');
 }

 // Add scroll event listener to toggle fixed class
 window.addEventListener('scroll', function () {
     if (window.scrollY > header.offsetHeight) {
         document.body.classList.add('fixed-toggle');
     } else {
         document.body.classList.remove('fixed-toggle');
     }
 });
});