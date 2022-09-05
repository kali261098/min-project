
fetch('http://localhost:8081/admin/viewStudent')
    .then(function (response) {
        return response.json();
    }).then(function (apiJsonData) {
        console.log(apiJsonData);
        renderDataInTheTable(apiJsonData);
    })

function renderDataInTheTable(studentList) {
    const mytable = document.getElementById("html-data-table");
    studentList.forEach(student => {
        let newRow = document.createElement("tr");
        let email;
        console.log(student);
        Object.keys(student).forEach((key) => {
            console.log(key);
            console.log(student[key]);
            if (key == "isapprove") {
                if (student[key] == false) {
                    let actioncell = document.createElement("td");
                    let button = `<button  onclick=approve("${email}")>Approve</button>`;
                    actioncell.innerHTML = button;
                    newRow.appendChild(actioncell);
                } else {
                    let cell = document.createElement("td");
                    let value = student[key];
                    cell.innerHTML = "Approved";
                    newRow.appendChild(cell);

                }
            } else {
                let cell = document.createElement("td");
                let value = student[key];
                cell.innerHTML = value;
                newRow.appendChild(cell);
                if (key == "email") {
                    email = value;
                }
            }

            mytable.appendChild(newRow);

        })

    });

}
function approve(email) {
    console.log(email);

    fetch('http://localhost:8081/admin/approveStudent?email=' + email)
        .then(function (response) {
            console.log(apiJsonData);
            console.log("Approved sucessfully");
            alert("Approved sucessfully");
            window.location = "http://127.0.0.1:5500/viewstudent.html"
        })
}