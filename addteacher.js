
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


    const Url = 'http://localhost:8080/admin/addTecher';
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
        window.location = "http://127.0.0.1:5500/admin.html"

    }

    const failure = function (reponse) {
        console.log("process failed");
    }
    console.log(user);
    axios.post(Url, user).then(success)
        .catch(failure);
}