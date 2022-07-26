
function register() {

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
    const ug = document.getElementById("ug").value;
    console.log(ug);
    const ugper = document.getElementById("ugper").value;
    console.log(ugper);
    const hsc = document.getElementById("hsc").value;
    console.log(hsc);
    const hscper = document.getElementById("hscper").value;
    console.log(hscper);
    const sslc = document.getElementById("sslc").value;
    console.log(sslc);
    const sslcper = document.getElementById("sslcper").value;
    console.log(sslcper);


    const Url = 'http://localhost:8080/user/register';
    const user = {
        name: name,
        phone: phone,
        email: email,
        dob: dob,
        gender: gender,
        address: address,
        ug: ug,
        ugper: ugper,
        hsc: hsc,
        hscper: hscper,
        sslc: sslc,
        sslcper: sslcper,

    }
    const success = function (reponse) {
        console.log("registered successfully");
        window.location = "http://127.0.0.1:5500/login.html"

    }

    const failure = function (reponse) {
        console.log("Registration failed");
    }
    console.log(user);
    axios.post(Url, user).then(success)
        .catch(failure);
}