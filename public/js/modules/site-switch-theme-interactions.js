let theme_switch_button = document.querySelectorAll(".js-theme-switch");
let docHTML = document.querySelector('html');

theme_switch_button.forEach((btn, idx) => {
    btn.addEventListener('click', ()=> {
        docHTML.classList.toggle('dark');
        if(docHTML.classList.contains('dark')) {
            theme_switch_button[0].classList.add('active');
            theme_switch_button[1].classList.add('active');
            localStorage.setItem('site_dark_mode', JSON.stringify(true));
        } else {
            theme_switch_button[0].classList.remove('active');
            theme_switch_button[1].classList.remove('active');
            localStorage.removeItem('site_dark_mode');
        }
    });
});

window.addEventListener('load', () => {
    let gtls_tsv = localStorage.getItem('site_dark_mode');
    if(gtls_tsv) {
        docHTML.classList.add('dark');
        theme_switch_button[0].classList.add('active');
        theme_switch_button[1].classList.add('active');
    }
})