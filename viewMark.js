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
    console.log(email);
    if (!email) {
        window.location = "http://127.0.0.1:1234/login1.html"
    }
    fetch('http://localhost:8081/viewStudentMark?email=' + email + '&subject=' + subject)
        .then(function (response) {
            return response.json();
        }).then(function (apiJsonData) {
            console.log(apiJsonData);
            console.log(apiJsonData.at1);
            document.getElementById("ut1").innerHTML = apiJsonData.ut1;
            document.getElementById("ut2").innerHTML = apiJsonData.ut2;
            document.getElementById("ut3").innerHTML = apiJsonData.ut3;
            document.getElementById("tut").innerHTML = apiJsonData.tut;
            document.getElementById("at1").innerHTML = apiJsonData.at1;
            document.getElementById("at2").innerHTML = apiJsonData.at2;
            document.getElementById("at3").innerHTML = apiJsonData.at3;
            document.getElementById("tat").innerHTML = apiJsonData.aut;
            document.getElementById("im").innerHTML = apiJsonData.internal;
            document.getElementById("em").innerHTML = apiJsonData.external;
            document.getElementById("tm").innerHTML = apiJsonData.total;
            document.getElementById("cgpa").innerHTML = apiJsonData.grade;
        })
}