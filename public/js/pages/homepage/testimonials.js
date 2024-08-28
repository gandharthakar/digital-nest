function offset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left,
        top: rect.top
    };
}

const referer_el = document.querySelector('.js-ref-div');
const setter_el = document.querySelector('.js-set-div');

const possitionTestimonialCont = () => {
    const left = offset(referer_el).left;
    setter_el.style.paddingLeft = (left + 20) + 'px';
}

window.addEventListener('load', possitionTestimonialCont);
window.addEventListener('resize', possitionTestimonialCont);

const testSwiper = new Swiper('.js-test-sldr', {
    slidesPerView: 'auto',
    spaceBetween: 20,

    // Navigation arrows
    navigation: {
        prevEl: '.js-testsldr-prevbtn',
        nextEl: '.js-testsldr-nextbtn',
    },
});