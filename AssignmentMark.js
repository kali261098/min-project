
function loadData() {
    let email = localStorage.getItem("teacherEmail");
    if (!email) {
        window.location = "http://127.0.0.1:5500/login1.html"
    }
    fetch('http://localhost:8081/viewAssignmentMark?email=' + email)
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
            cell.innerHTML = value;
            if (key != "name" && key != "email") {
             cell.contentEditable = true;   
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
    assignmentMarkList = []
for (i = 0; i < rowLength; i++){

   var oCells = oTable.rows.item(i).cells;

    var cellLength = oCells.length;
    let name;
    let email;
    let test1;
    let test2;
    let test3;

   for(var j = 1; j < cellLength; j++){
       if (j == 1) {
           name = oCells.item(j).innerHTML;
       }
       if (j == 2) {
           email = oCells.item(j).innerHTML;
      }if (j == 3) {
           test1 = oCells.item(j).innerHTML;
      }if (j == 4) {
           test2 = oCells.item(j).innerHTML;
      }if (j == 5) {
           test3 = oCells.item(j).innerHTML;
      }
   }
    let unitTest = {
        name  : name,
        email : email,
        test1 : test1,
        test2 : test2,
        test3 : test3
    }
    console.log("Unit Test");
    console.log(unitTest);
    assignmentMarkList.push(unitTest);
}
    
    let email = localStorage.getItem("teacherEmail");
    const Url = 'http://localhost:8081/saveAssignmentMark';
    const saveUnitTest = {
        email: email,
        assignmentMarkList: assignmentMarkList

    }
    const success = function (reponse) {
        console.log("Unit Test Mark Saved successfully");
        window.location = "http://127.0.0.1:5500/AssignmentMark.html"

    }

    const failure = function (reponse) {
        console.log("Unable to save unit test mark");
    }
    console.log(saveUnitTest);
    axios.post(Url, saveUnitTest).then(success)
        .catch(failure);
}