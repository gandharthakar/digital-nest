const result = document.querySelector("#result");
const noResult = document.querySelector("#no_res_found");
const spinner = document.querySelector("#spinner");
const form = document.querySelector("#certv_form");
const input = document.querySelector("#cert_no");
const inputError = document.querySelector("#vc_error");

const genImg = (img) => {
    return img ? `public/images/svc-photos/${img}` : 'https://placehold.co/300x350?text=Student+Photo'
}

const getResultStatus = (marksObtained) => {
    if(marksObtained > 35) {
        return '<span class="result pass">Pass</span>';
    } else {
        return '<span class="result fail">Fail</span>';
    }
}

const calculateGrade = (marksObtained, outOfMarks = 100) => {
    // Calculate the percentage
    const percentage = (marksObtained / outOfMarks) * 100;

    // Determine the grade based on the percentage
    if(percentage > 80) {
        return "O";
    } else if (percentage > 75) {
        return "A+"
    } else if (percentage >= 70) {
        return "A"
    } else if (percentage > 65) {
        return "B+"
    }  else if (percentage >= 60) {
        return "B"
    } else if (percentage > 45) {
        return "C+"
    } else if (percentage >= 40) {
        return "C"
    } else if (percentage >= 35) {
        return "D"
    } else {
        return "F"
    }
}

const prepResultBox = (data) => {
    let template = `
        <div class="vcsec-pad-3">
            <div class="vcsec-rimg-cnt">
                <div class="inner">
                    <img src="${genImg(data.student_photo)}" width="150px" height="175px" class="photo-img" alt="photo" />
                    <img src="public/images/verified.png" class="vimg" alt="verify image">
                </div>
            </div>
        </div>

        <div class="vcsec-nfo-o1">
            <div class="vcsec-nfo-o2">
                <div class="vcsec-nfo-grid">
                    <div class="vcsec-legend">
                        Certificate Number:
                    </div>
                    <div class="vcsec-main">
                        ${data.certification_number}
                    </div>
                    <div class="vcsec-legend">
                        Full Name:
                    </div>
                    <div class="vcsec-main">
                        ${data.student_full_name}
                    </div>
                    <div class="vcsec-legend">
                        Course Name: 
                    </div>
                    <div class="vcsec-main">
                        ${data.course_name}
                    </div>
                    <div class="vcsec-legend">
                        Issued Date: 
                    </div>
                    <div class="vcsec-main">
                        ${data.issued_date}
                    </div>
                    <div class="vcsec-legend">
                        Marks Obtained: 
                    </div>
                    <div class="vcsec-main">
                        ${data.marks_obtained} / ${data.marks_out_of}
                    </div>
                    <div class="vcsec-legend">
                        Grade: 
                    </div>
                    <div class="vcsec-main">
                        ${calculateGrade(data.marks_obtained, data.marks_out_of)}
                    </div>
                    <div class="vcsec-legend">
                        Result: 
                    </div>
                    <div class="vcsec-main">
                        ${getResultStatus(data.marks_obtained)}
                    </div>
                </div>
            </div>
        </div>
    `;
    return template;
}

const getStudent = async (cid) => {
    spinner.style.display = 'inline-block';
    const resp = await fetch(`public/data/student-certifications.json`);
    const body = await resp.json();
    const filterStudent = body.filter((item) => item.certification_number === cid);
    if(filterStudent.length > 0) {
        let st = setTimeout(() => {
            noResult.style.display = 'none';
            let box = prepResultBox(filterStudent[0]);
            result.innerHTML = '';
            result.insertAdjacentHTML("afterbegin", box);
            spinner.style.display = 'none';
            clearTimeout(st);
        }, 500);
    } else {
        let st = setTimeout(() => {
            noResult.style.display = 'block';
            spinner.style.display = 'none';
            result.innerHTML = '';
            clearTimeout(st);
        }, 500);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(input.value == '') {
        inputError.style.display = 'block';
    } else {
        inputError.style.display = 'none';
        noResult.style.display = 'none';
        getStudent(input.value);
    }
});

input.addEventListener('keyup', (e) => {
    let { value } = e.target;
    if(value == '') {
        inputError.style.display = 'block';
    } else {
        inputError.style.display = 'none';
    }
});