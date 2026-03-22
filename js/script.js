// Show message function
function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    if (!messageDiv) return; // prevent error if not present
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
}

const regForm = document.getElementById('registrationForm');

if (regForm) {
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confirm = document.getElementById("confirm").value;

        if (name === "" || email === "" || password === "" || confirm === "") {
            showMessage("All fields are required!", "error");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            showMessage("Enter valid email", "error");
            return;
        }

        if (password !== confirm) {
            showMessage("Passwords do not match!", "error");
            return;
        }

        if (password.length < 6) {
            showMessage("Password must be at least 6 characters!", "error");
            return;
        }

        // ✅ store AFTER validation
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        showMessage("Registration successful ✅", "success");

        regForm.reset();

        // redirect
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    });
}


// ================= LOGIN =================
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let email = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPassword").value;

        if (email === "" || password === "") {
            showMessage("All fields are required", "error");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            showMessage("Enter valid email", "error");
            return;
        }

        let storedEmail = localStorage.getItem("email");
        let storedPassword = localStorage.getItem("password");

       if (email === storedEmail && password === storedPassword) {
             showMessage("Login successful ✅", "success");
            // ✅ go to HOME PAGE
            window.location.href = "index.html";
        } 
        else {
            showMessage("Invalid email or password ❌", "error");
     }
    });
}
fetch('courses.xml')
.then(response => response.text())
.then(data => {
    let parser = new DOMParser();
    let xml = parser.parseFromString(data, "text/xml");

    let courses = xml.getElementsByTagName("course");
    let output = "";

    for (let i = 0; i < courses.length; i++) {

        let title = courses[i].getElementsByTagName("title")[0].textContent;
        let instructor = courses[i].getElementsByTagName("instructor")[0].textContent;
        let description = courses[i].getElementsByTagName("description")[0].textContent;
        let duration = courses[i].getElementsByTagName("duration")[0].textContent;
        let price = courses[i].getElementsByTagName("price")[0].textContent;
        let image = courses[i].getElementsByTagName("image")[0].textContent;
        let link = courses[i].getElementsByTagName("link")[0].textContent;

        output += `
        <div class="course-card">
            <a href="${link}" target="_blank">
                <img src="${image}" width="200" height="150">
            </a>
            <div class="course-info">
                <p><strong>${title}</strong></p>
                <ul>
                    <li>Instructor: ${instructor}</li>
                    <li>${description}</li>
                    <li>Duration: ${duration}</li>
                    <li>Price: ${price}</li>
                </ul>
            </div>
        </div>
        `;
    }

    document.getElementById("courseContainer").innerHTML = output;
});
