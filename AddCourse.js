function openCourseForm() {
        document.getElementById("courseForm").style.display = "block";
}
      
function closeCourseForm() {
     document.getElementById("courseForm").style.display = "none";
}

function loadData() {
        fetch('http://localhost:8081/getSubject')
    .then(function (response) {
        return response.json();
    }).then(function (apiJsonData) {
        console.log(apiJsonData);
        renderDataInTheTable(apiJsonData);
    })
}

function renderDataInTheTable(subjectList) {
        const mytable = document.getElementById("table-row");
        var count = 1;
        subjectList.forEach(subject => {
        let newRow = document.createElement("tr");
        let cell = document.createElement("td");
        cell.innerHTML = count;
        newRow.appendChild(cell);
        mytable.appendChild(newRow);
        count = count + 1;
        let scode;
        Object.keys(subject).forEach((key) => {
            console.log(key);
            console.log(subject[key]);
                if (key == "subjectCode") {
                        scode = subject[key];
                }
                let cell = document.createElement("td");
                let value = subject[key];
                cell.innerHTML = value;
                newRow.appendChild(cell);
                mytable.appendChild(newRow);
        })
                cell = document.createElement("td");
                cell.innerHTML = `<button> <i class="fas fa-edit"></i> </button>
                            <button onclick=deleteCourse("${scode}")><i class="fa-solid fa-trash"></i></button>`;
                newRow.appendChild(cell);
                mytable.appendChild(newRow);

    });

}

function addCourse() {
    const scode = document.getElementById("scode").value;
    console.log(scode);
    const sname = document.getElementById("sname").value;
    console.log(sname);
    const credit = document.getElementById("credit").value;
        console.log(credit);
     const Url = 'http://localhost:8081/addSubject';
    const subject = {
        subjectCode: scode,
        subjectName: sname,
        credit: credit
    }
    const success = function (reponse) {
        console.log("Subject added successfully");
        window.location = "http://127.0.0.1:5500/AddCourse.html"

    }

    const failure = function (reponse) {
        console.log("Subject failed");
    }
    console.log(subject);
    axios.post(Url, subject).then(success)
        .catch(failure);
        
        
}

function deleteCourse(scode) {
        fetch('http://localhost:8081/deleteSubject?subjectCode=' + scode)
    .then(function (response) {
        window.location = "http://127.0.0.1:5500/AddCourse.html"
    })
        
}