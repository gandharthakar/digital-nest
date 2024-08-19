
let open_menu_button = document.querySelector(".js-open-menu");
let close_menu_button = document.querySelector(".js-close-menu");
let menu = document.querySelector(".js-site-nav");

open_menu_button.addEventListener('click', () => {
    menu.classList.add('active');
});

close_menu_button.addEventListener('click', () => {
    menu.classList.remove('active');
});