document.getElementById("contactForm").addEventListener("submit", function(event) {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    if (name === "" || email === "" || phone === "") {
        alert("Please fill out all fields.");
        event.preventDefault();
    }
});
