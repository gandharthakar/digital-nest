function offset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left,
        top: rect.top
    };
}

const referer_el = document.querySelector('.js-ref-div');
const setter_el = document.querySelector('.js-set-div');
const testiWrapper = document.querySelector('#testi_wrapper');

const possitionTestimonialCont = () => {
    const left = offset(referer_el).left;
    setter_el.style.paddingLeft = (left + 20) + 'px';
}

window.addEventListener('load', possitionTestimonialCont);
window.addEventListener('resize', possitionTestimonialCont);

const prepTestimonialsBox = (data) => {
    let template = `
        <div class="swiper-slide test-sslide">
            <blockquote class="testimonial-item">
                <div class="testimonial-box">
                    <div class="top-qt">
                        <svg class="svg-icon" width="50px" height="50px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path class="fill" fill="#000000" d="M5.29289 1.29291L6.70711 2.70712L3 6.41423V7.00001H7V14H1V5.5858L5.29289 1.29291Z" />
                            <path class="fill" fill="#000000" d="M15 7.00001H11V6.41423L14.7071 2.70712L13.2929 1.29291L9 5.5858V14H15V7.00001Z" />
                        </svg>
                    </div>
                    <div class="testimonial-cont">
                        <p>
                            ${data.testimonial_content}
                        </p>
                    </div>
                    <div class="bottom-qt">
                        <svg class="svg-icon" width="50px" height="50px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path class="fill" fill="#000000" d="M7 10.4142L2.70711 14.7071L1.29289 13.2929L5 9.58579V9L1 9V2H7V10.4142Z" />
                            <path class="fill" fill="#000000" d="M9 9L13 9V9.58579L9.29289 13.2929L10.7071 14.7071L15 10.4142L15 2H9L9 9Z" />
                        </svg>
                    </div>

                    <div class="auth-box">
                        <h5 class="auth-name">${data.testimonial_user_name}</h5>
                        <h6 class="auth-desi">${data.testimonial_user_designation}</h6>
                    </div>
                </div>
            </blockquote>
        </div>
    `;
    return template;
}

const getTestimonials = async () => {
    const resp = await fetch(`public/data/testimonials.json`);
    const body = await resp.json();
    const rev_body = body.reverse();
    for(let i = 0; i < rev_body.length; i++) {
        let box = prepTestimonialsBox(rev_body[i]);
        testiWrapper.insertAdjacentHTML("afterbegin", box);
    }
    
    let st = setTimeout(() => {
        new Swiper('.js-test-sldr', {
            slidesPerView: 'auto',
            spaceBetween: 20,
        
            // Navigation arrows
            navigation: {
                prevEl: '.js-testsldr-prevbtn',
                nextEl: '.js-testsldr-nextbtn',
            },
        });
        clearTimeout(st);
    }, 200);
}

getTestimonials();