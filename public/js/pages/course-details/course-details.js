
const courseCoverPhoto = document.querySelector("#course_cover_photo");
const courseName = document.querySelector("#course_name");
const courseSummary = document.querySelector("#course_summary");
const courseDuration = document.querySelector("#course_duration");
const courseBatchTime = document.querySelector("#course_batch_time");
const courseTutor = document.querySelector("#course_tutor");
const courseMode = document.querySelector("#course_mode");
const courseAbout = document.querySelector("#course_about");
const courseSyllabus = document.querySelector("#course_syllabus");
const courseEnqLink = document.querySelector("#course_enq_link");

const urlParams = new URLSearchParams(window.location.search);
const course_id = urlParams.get('course_id');

const genImg = (img) => {
    return img ? `public/images/course-thumb/final/${img}` : 'https://placehold.co/700x500?text=Course+Cover+Photo'
}

const getCourseInfo = async (cid) => {
    const resp = await fetch(`public/data/courses.json`);
    const body = await resp.json();
    let res = body.filter((item) => item.course_id === cid);
    courseCoverPhoto.src = `${genImg(res[0].course_cover_photo)}`;
    courseName.innerHTML = `${res[0].course_name}`;
    courseSummary.innerHTML = `${res[0].course_summary}`;
    courseDuration.innerHTML = `${res[0].course_duration}`;
    courseBatchTime.innerHTML = `${res[0].course_batch_time}`;
    courseTutor.innerHTML = `${res[0].course_tutor}`;
    courseMode.innerHTML = `${res[0].course_mode}`;
    courseAbout.innerHTML = `${res[0].course_about}`;
    let sylList = res[0].course_syllabus;
    courseSyllabus.innerHTML = '';
    let rev_sylList = sylList.reverse();
    for(let i = 0; i < rev_sylList.length; i++) {
        let list = `<li>${sylList[i]}</li>`;
        courseSyllabus.insertAdjacentHTML("afterbegin", list);
    }

    let link = "https://forms.gle/E38N2bVHb9jEzcBe9";
    courseEnqLink.href = link;
}

if(course_id && course_id !== '') {
    getCourseInfo(course_id);
} else {
    alert("Missing Course ID.");
}