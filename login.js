

async function login() {
    const email = document.getElementById("email").value;
    console.log(email);
    const pass = document.getElementById("psw").value;
    console.log(pass);
    if (email == "admin@gmail.com") {
        if (pass == "admin@123") {
            console.log("Login sucessfully");
            alert("Login sucessfully");
            alert("http://127.0.0.1:5500/admin.html")
            window.location = "http://127.0.0.1:5500/admin.html"
            // location.replace("http://127.0.0.1:5500/admin.html")

        }
        else {
            alert("please enter the correct password");
        }

    }
    else {
        const response = await axios.get('http://localhost:8081/user/login?email=' + email);
        console.log(response);
        if (response.status == 200) {

            const dbpass = response.data.password;
            if (dbpass == pass) {
                console.log("Login sucessfully");
                alert("Login sucessfully");
                const role = response.data.role;
                if (role == "teacher") {
                    localStorage.setItem("teacherEmail", email);
                    window.location = "http://127.0.0.1:5500/teacher.html"
                } else {
                    localStorage.setItem("studentEmail", email);
                    window.location = "http://127.0.0.1:5500/student.html"
                }
            }
            else {
                alert("please enter the correct password");
            }

        }
        else {
            alert("Username does not exist.please register");
        }

    }


}