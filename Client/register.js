// Register
const registerForm = document.querySelector(".registerForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const userName = document.getElementById("userName");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");
const password = document.getElementById("password");
const errorMsg = document.querySelector(".errorMsg");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let user =
        firstName.value !== "" &&
        lastName.value !== "" &&
        userName.value !== "" &&
        email.value !== "" &&
        phoneNumber.value !== "" &&
        password.value !== "";

    if (user) {
        axios
            .post("http://localhost:3003/user/register", {
                firstName: firstName.value,
                lastName: lastName.value,
                userName: userName.value,
                email: email.value,
                phoneNumber: phoneNumber.value,
                password: password.value
            }, {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
            })
            .then((response) => {
                registerForm.reset();
                console.log(response.data);

                const errorMsgElement = document.querySelector('.errorMsg');

                if (errorMsgElement) {
                    errorMsgElement.textContent = response.data.message;
                    errorMsgElement.classList.remove('error');
                    errorMsgElement.classList.add('success');

                    setTimeout(() => {
                        window.location.href = '/Client/login.html';
                    }, 2000);
                }

                setTimeout(() => {
                    const errorMsgElement = document.querySelector('.errorMsg');

                    if (errorMsgElement) {
                        errorMsgElement.textContent = response.data.message;
                        errorMsgElement.classList.remove('success');
                        errorMsgElement.classList.remove('error');
                    }
                }, 2000);
            })
            .catch((error) => {
                console.error(error);
                const errorMsgElement = document.querySelector('.errorMsg');

                if (errorMsgElement) {
                    errorMsgElement.textContent = error.response ? error.response.data.message : 'An error occurred.';
                    errorMsgElement.classList.remove('success');
                    errorMsgElement.classList.add('error');

                    setTimeout(() => {
                        errorMsgElement.textContent = '';
                        errorMsgElement.classList.remove('success');
                        errorMsgElement.classList.remove('error');
                    }, 3000);
                }
            });
    }
});


// JavaScript to toggle password visibility
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {
    const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
});
