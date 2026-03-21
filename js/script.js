function validateForm() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirm").value;

    // Name validation
    if (name === "") {
        alert("Name cannot be empty");
        return false;
    }

    // Email validation
    if (!email.includes("@") || !email.includes(".")) {
        alert("Enter a valid email");
        return false;
    }

    // Password length
    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return false;
    }

    // Password match
    if (password !== confirm) {
        alert("Passwords do not match!");
        return false;
    }

    alert("Registration Successful!");
    return true;
}
