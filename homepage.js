// form validation
function validateEmail() {
    const email = document.getElementById("email").value;
    const domain = "@gandakiuniversity.edu.np";
    // Check if email ends with the required domain
    if (!email.endsWith(domain)) {
        alert("sorry! You don't belong from Gandaki University, we can't give you the accesss to send message.");
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}


// this is courses enrollment part
document.addEventListener("DOMContentLoaded", function () {
    const enrollButtons = document.querySelectorAll(".course-card .btn-primary");

    enrollButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior

            // Check if user is logged in (Assuming 'isLoggedIn' is stored in localStorage)
            let isLoggedIn = localStorage.getItem("isLoggedIn");

            if (isLoggedIn === "true") {
                // Redirect to course page
                window.location.href = "course-page.html"; 
            } else {
                // Redirect to login page
                alert("You must be logged in to enroll in a course.");
                window.location.href = "login.html";
            }
        });
    });
});


// fatching navbar across all pages
fetch('navbar.html')
.then(response => response.text())
.then(data => document.getElementById('navbar').innerHTML = data);