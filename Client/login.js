// Login
const loginForm = document.querySelector(".loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errorMsg = document.querySelector(".errorMsg");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let user =
        email.value !== "" &&
        password.value !== "";

    if (user) {
        axios
            .post("http://localhost:3003/user/login", {
                email: email.value,
                password: password.value
            }, {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
            })
            .then((response) => {
                loginForm.reset();
                console.log(response.data);

                const errorMsgElement = document.querySelector('.errorMsg');

                if (errorMsgElement) {
                    errorMsgElement.textContent = response.data.message;
                    errorMsgElement.classList.remove('error');
                    errorMsgElement.classList.add('success');

                    setTimeout(() => {
                        window.location.href = '/Client/index.html';
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
