const fadeIn = ( elem, ms ) => {
    if( ! elem )
        return;

    elem.style.opacity = 0;
    elem.style.filter = "alpha(opacity=0)";
    elem.style.display = "inline-block";
    elem.style.visibility = "visible";

    if(ms) {
        var opacity = 0;
        var timer = setInterval( function() {
            opacity += 50 / ms;
            if(opacity >= 1) {
                clearInterval(timer);
                opacity = 1;
            }
            elem.style.opacity = opacity;
            elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        }, 50 );
    } else {
        elem.style.opacity = 1;
        elem.style.filter = "alpha(opacity=1)";
    }
}

const fadeOut = ( elem, ms ) => {
    if(! elem)
        return;

    if(ms) {
        var opacity = 1;
        var timer = setInterval( function() {
            opacity -= 50 / ms;
            if( opacity <= 0 ) {
                clearInterval(timer);
                opacity = 0;
                elem.style.display = "none";
                elem.style.visibility = "hidden";
            }
            elem.style.opacity = opacity;
            elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        }, 50 );
    } else {
        elem.style.opacity = 0;
        elem.style.filter = "alpha(opacity=0)";
        elem.style.display = "none";
        elem.style.visibility = "hidden";
    }
}

const modalBackdrop = document.querySelector(".js-mdl-bkdrp");
const modal = document.querySelector(".js-mdl-mn");
const closeModal = document.querySelector(".js-mdl-close");

let st = setTimeout(() => {
    fadeIn(modal, 500);
    fadeIn(modalBackdrop, 500);
    clearTimeout(st);
}, 3000);

let closeModalOnBackdropClick = true;

closeModal.addEventListener("click", () => {
    fadeOut(modal, 500);
    fadeOut(modalBackdrop, 500);
});

modalBackdrop.addEventListener("click", () => {
    if(closeModalOnBackdropClick) {
        fadeOut(modal, 500);
        fadeOut(modalBackdrop, 500);
    }
})