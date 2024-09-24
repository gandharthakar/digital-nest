const gridCont = document.querySelector("#course_grid");

const genImg = (img) => {
    return img ? `public/images/course-thumb/final/${img}` : 'https://placehold.co/700x500?text=Course+Cover+Photo'
}

const prepCourseBox = (data) => {
    let template = `
        <div class="course-card-item" title="${data.course_name}">
            <div class="thumb-cont">
                <img src="${genImg(data.course_cover_photo)}" width="700px" height="500px" alt="Course Thumb" />
            </div>
            <div class="main-content">
                <div class="ccipad-1">
                    <h3 class="cci-title">
                        ${data.course_name}
                    </h3>
                </div>
                <div class="ccipad-2">
                    <p class="cci-description">
                        ${data.course_summary}
                    </p>
                </div>
            </div>
            <div class="ccicta-cont">
                <a href="course-details.html?course_id=${data.course_id}" title="View Details" class="site-button-s2 min-w-1 btn-flex-between flex-1 text-center theme-color-2">
                    <span class="str">View Details</span>
                    <span class="material-symbols-outlined mn-icon">
                        keyboard_arrow_right
                    </span>
                </a>
                <a href="https://forms.gle/E38N2bVHb9jEzcBe9" title="Enquiry Now" class="site-button-s2 min-w-1 btn-flex-between flex-1 text-center" target="_blank">
                    <span class="str">Enquiry Now</span>
                    <span class="material-symbols-outlined mn-icon">
                        keyboard_arrow_right
                    </span>
                </a>
            </div>
        </div>
    `;
    return template;
}

const getCourses = async () => {
    const resp = await fetch(`public/data/courses.json`);
    const body = await resp.json();
    const popCourses = body.filter((item) => item.hightlight_in_homepae === true).reverse();
    for(let i = 0; i < popCourses.length; i++) {
        let box = prepCourseBox(popCourses[i]);
        gridCont.insertAdjacentHTML("afterbegin", box);
    }
}

getCourses();