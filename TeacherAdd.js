function openCourseForm() {
    document.getElementById("courseForm").style.display = "block";
}

function closeCourseForm() {
    document.getElementById("courseForm").style.display = "none";
}

function loadData() {
    fetch('http://localhost:8081/admin/getTeacher')
        .then(function (response) {
            return response.json();
        }).then(function (apiJsonData) {
            console.log(apiJsonData);
            renderDataInTheTable(apiJsonData);
        })
}

function renderDataInTheTable(TeacherList) {
    const mytable = document.getElementById("table-row");
    var count = 1;
    TeacherList.forEach(teacher => {
        let newRow = document.createElement("tr");
        let cell = document.createElement("td");
        cell.innerHTML = count;
        newRow.appendChild(cell);
        mytable.appendChild(newRow);
        count = count + 1;
        let email;
        Object.keys(teacher).forEach((key) => {
            console.log(key);
            console.log(teacher[key]);
            if (key == "email") {
                email = teacher[key];
            }
            let cell = document.createElement("td");
            let value = teacher[key];
            cell.innerHTML = value;
            newRow.appendChild(cell);
            mytable.appendChild(newRow);
        })
        console.log("Hi", teacher);
        cell = document.createElement("td");
        cell.innerHTML = `<button> <i class="fas fa-edit"></i> </button>
                            <button onclick=deleteTeacher("${email}")><i class="fa-solid fa-trash"></i></button>`;
        newRow.appendChild(cell);
        mytable.appendChild(newRow);

    });

}

function addTeacher() {
    const name = document.getElementById("fullname").value;
    console.log(name);
    const phone = document.getElementById("phone").value;
    console.log(phone);
    const email = document.getElementById("email").value;
    console.log(email);
    const dob = document.getElementById("dob").value;
    console.log(dob);
    const gender = document.getElementById("gender").value;
    console.log(gender);
    const address = document.getElementById("address").value;
    console.log(address);
    const degree = document.getElementById("degree").value;
    console.log(degree);
    const exp = document.getElementById("exp").value;
    console.log(exp);
    const spc = document.getElementById("spc").value;
    console.log(spc);


    const Url = 'http://localhost:8081/admin/addTecher';
    const user = {
        name: name,
        phone: phone,
        email: email,
        dob: dob,
        gender: gender,
        address: address,
        degree: degree,
        exp: exp,
        spc: spc,

    }
    const success = function (reponse) {
        console.log("Add successfully");
        window.location = "http://127.0.0.1:5500/TeacherAdd.html"

    }

    const failure = function (reponse) {
        console.log("process failed");
    }
    console.log(user);
    axios.post(Url, user).then(success)
        .catch(failure);


}

function updateTeacher(teacher, email) {
    console.log(teacher);
    console.log(email);
}

function deleteTeacher(email) {
    fetch('http://localhost:8081/admin/deleteTeacher?email=' + email)
        .then(function (response) {
            window.location = "http://127.0.0.1:5500/TeacherAdd.html"
        })

}