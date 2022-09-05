function loadData() {

    fetch('http://localhost:8081/viewSemesterMark?email=' + ' ')
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


            if (key == "name" || key == "email") {
                let cell = document.createElement("td");
                let value = mark[key];
                cell.innerHTML = value;
                cell.contentEditable = true;
                newRow.appendChild(cell);
            }

            tbody.appendChild(newRow);

        })

    });

}