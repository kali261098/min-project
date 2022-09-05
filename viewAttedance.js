const wrapper = document.querySelector(".wrapper"),
    selectBtn = wrapper.querySelector(".select-btn"),
    searchInp = wrapper.querySelector("input"),
    options = wrapper.querySelector(".options");

let countries = getSubject();
console.log(countries);

function addCountry(selectedCountry) {
    options.innerHTML = "";
    countries.forEach(country => {
        let isSelected = country == selectedCountry ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}

function updateName(selectedLi) {
    searchInp.value = "";
    addCountry(selectedLi.innerText);
    loadData(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
    document.getElementById("t2").style.display = "block";
}

searchInp.addEventListener("keyup", () => {
    let arr = [];
    let searchWord = searchInp.value.toLowerCase();
    arr = countries.filter(data => {
        return data.toLowerCase().startsWith(searchWord);
    }).map(data => {
        let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
    }).join("");
    options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Country not found</p>`;
});

selectBtn.addEventListener("click", () => {
    wrapper.classList.toggle("active");
    document.getElementById("t2").style.display = "none";
});

function getSubject() {
    var countr = fetch('http://localhost:8081/getSubjectList')
        .then(function (response) {
            return response.json();
        }).then(function (apiJsonData) {
            console.log(apiJsonData[0]);
            countries = apiJsonData;
            addCountry();
            return apiJsonData;
        })
    return countr;
}


function loadData(subject) {
    let email = localStorage.getItem("studentEmail");
    if (!email) {
        window.location = "http://127.0.0.1:5500/login1.html"
    }
    fetch('http://localhost:8081/Attedance/Student?email=' + email + '&subject=' + subject)
        .then(function (response) {
            return response.json();
        }).then(function (apiData) {
            console.log(apiData);
            renderDataInTheTable(apiData.absentList);
            setTotal(apiData.total)
            setPresent(apiData.present)
            setAbsent(apiData.absent)
            setPer(apiData.percentage)

        })
}
function temp() {
    absentList = ["2022-08-7", "2022-08-8", "2022-08-9", "2022-08-10", "2022-08-11"];
    apiData = {
        total: 10,
        present: 8,
        absent: 2,
        percentage: "80 %",
        absentList: absentList
    }
    renderDataInTheTable(apiData.absentList);
    setTotal(apiData.total)
    setPresent(apiData.present)
    setAbsent(apiData.absent)
    setPer(apiData.percentage)



}
function setTotal(total) {
    document.getElementById("total").innerHTML = "Total attedance :" + total;
}
function setPresent(present) {
    document.getElementById("present").innerHTML = "Present  :" + present;
}
function setAbsent(absent) {
    document.getElementById("absent").innerHTML = "Absent  :" + absent;
}
function setPer(percentage) {
    document.getElementById("percentage").innerHTML = "Percentage :" + percentage;
}

function renderDataInTheTable(absentList) {
    const tbody = document.getElementById("tbody");
    let count = 1;
    absentList.forEach(absent => {
        console.log(absent);
        absent = absent.substring(0, 10);
        let newRow = document.createElement("tr");
        let cell1 = document.createElement("td");
        cell1.innerHTML = count;
        newRow.appendChild(cell1);
        tbody.appendChild(newRow);
        count = count + 1;
        let cell2 = document.createElement("td");
        cell2.innerHTML = absent;

        newRow.appendChild(cell2);
        tbody.appendChild(newRow);

    })

}

