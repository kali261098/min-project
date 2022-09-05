// function save() {
//     var date = document.getElementById("date").value;
//     console.log(date);
//     var attedance = document.getElementById("attedance").checked;
//     console.log(attedance);

// }
function setDate() {
    console.log("default date");
    document.getElementById('date').defaultValue = new Data();

}

function loadData() {
    let email = localStorage.getItem("teacherEmail");
    var date = localStorage.getItem("attendanceDate");
    console.log(date);
    if (!email) {
        window.location = "http://127.0.0.1:5500/login1.html"
    }
    if (!date) {
        date = new Date();
        console.log("new date" + date);

    }
    document.getElementById("date").value = date;

    fetch('http://localhost:8081/Attedance/viewAttedance?email=' + email + '&date=' + date)
        .then(function (response) {
            return response.json();
        }).then(function (apiJsonData) {
            console.log(apiJsonData);
            renderDataInTheTable(apiJsonData);
        })
}

function renderDataInTheTable(markList) {
    const tbody = document.getElementById("tbody");

    let count = 1;
    markList.forEach(mark => {
        console.log(mark);
        let newRow = document.createElement("tr");
        let cell = document.createElement("td");
        cell.innerHTML = count;
        newRow.appendChild(cell);
        tbody.appendChild(newRow);
        count = count + 1;
        Object.keys(mark).forEach((key) => {
            console.log(key);
            console.log(mark[key]);

            let cell = document.createElement("td");
            let value = mark[key];

            if (key != "name" && key != "email") {
                cell.contentEditable = true;
                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.name = "name";
                checkbox.checked = mark[key];
                cell.appendChild(checkbox);
            }
            else {
                cell.innerHTML = value;
            }
            newRow.appendChild(cell);
            tbody.appendChild(newRow);

        })

    });

}

function save() {
    console.log("function called");
    var oTable = document.getElementById('tbody');
    var rowLength = oTable.rows.length;
    semesterMarkDetails = []
    for (i = 0; i < rowLength; i++) {

        var oCells = oTable.rows.item(i).cells;

        var cellLength = oCells.length;
        let name;
        let email;
        let mark;

        for (var j = 1; j < cellLength; j++) {
            if (j == 1) {
                name = oCells.item(j).innerHTML;
            }
            if (j == 2) {
                email = oCells.item(j).innerHTML;
            } if (j == 3) {
                mark = oCells.item(j).firstChild.checked;
            }
        }
        let unitTest = {
            name: name,
            email: email,
            attendance: mark
        }
        console.log("Unit Test");
        console.log(unitTest);
        semesterMarkDetails.push(unitTest);
    }


    let email = localStorage.getItem("teacherEmail");
    var date = document.getElementById("date").value;
    console.log(date);
    const Url = 'http://localhost:8081/Attedance/DailyAttedance';
    const saveUnitTest = {
        teacherEmail: email,
        date: date,
        attendanceDailyList: semesterMarkDetails

    }
    const success = function (reponse) {
        console.log("Saved successfully");
        window.location = "http://127.0.0.1:5500/attedence.html"

    }

    const failure = function (reponse) {
        console.log("Unable to save unit test mark");
    }
    console.log(saveUnitTest);
    axios.post(Url, saveUnitTest).then(success)
        .catch(failure);
}

function dateChange() {
    var date = document.getElementById("date").value;
    console.log(date);
    localStorage.setItem("attendanceDate", date);
    window.location = "http://127.0.0.1:5500/attedence.html"
}