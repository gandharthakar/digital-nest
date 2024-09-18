const gridCont = document.querySelector("#course_grid");
const searchInput = document.querySelector("#course_search_input");
const searchForm = document.querySelector("#search_form");

const prepCourseBox = (data) => {
    let template = `
        <div class="course-card-item" title="MS-CIT">
            <div class="thumb-cont">
                <img src="public/images/course-thumb/final/${data.course_cover_photo}" width="700px" height="500px" alt="Course Thumb" />
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
    for(let i = 0; i < body.reverse().length; i++) {
        let box = prepCourseBox(body[i]);
        gridCont.insertAdjacentHTML("afterbegin", box);
    }
}

getCourses();

// Search Input
searchInput.addEventListener('keydown', async (e) => {
    if(e.key === "Backspace") {
        gridCont.innerHTML = '';
        const resp = await fetch(`public/data/courses.json`);
        const body = await resp.json();
        for(let i = 0; i < body.reverse().length; i++) {
            let box = prepCourseBox(body[i]);
            gridCont.insertAdjacentHTML("afterbegin", box);
        }
    }
})

// Search Submit.
searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let input_value = searchInput.value;
    let search_term = input_value.toLowerCase();
    if(search_term == '') {
        alert("Please Enter Value.");
    } else {
        const resp = await fetch(`public/data/courses.json`);
        const body = await resp.json();
        let res = body.filter((item) => {
            let search_results = item.course_name.toLowerCase().includes(search_term) || 
            item.course_summary.toLowerCase().includes(search_term);
            return search_results
        });
        gridCont.innerHTML = '';
        if(res.length > 0) {
            for(let i = 0; i < res.length; i++) {
                let box = prepCourseBox(res[i]);
                gridCont.insertAdjacentHTML("afterbegin", box);
            }
        } else {
            gridCont.insertAdjacentHTML("afterbegin", "<h4>No Courses Found</h4>");
        }
    }
});