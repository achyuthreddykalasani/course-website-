function validateForm() {
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirm").value;

    if (password !== confirm) {
        alert("Passwords do not match!");
        return false;
    }

    return true;
}