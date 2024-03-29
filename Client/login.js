// Login
const loginForm = document.querySelector(".loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errorMsg = document.querySelector(".errorMsg");
let token=''
let userId=''

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
                console.log('Response Data:', response.data); // Log the response data to check the structure
                const errorMsgElement = document.querySelector('.errorMsg');
            
                // Check if response data and userId exist
                if (response.data && response.data.userId) {
                    // Extract userId and token from the response
                    const userIdResponse = response.data.userId;
                    const tokenResponse = response.data.token;
                    console.log('userId:', userIdResponse);
            
                    // Store token and userId in localStorage
                    localStorage.setItem('token', tokenResponse);
                    localStorage.setItem('userId', userIdResponse);
                } else {
                    console.log('UserId is not present in the response or response data is invalid.');
                }
            
                if (errorMsgElement) {
                    errorMsgElement.textContent = response.data.message;
                    errorMsgElement.classList.remove('error');
                    errorMsgElement.classList.add('success');
            
                    setTimeout(() => {
                        window.location.href = '/Client/test.html'; // Redirect to the correct path
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
                console.error('Error occurred during login:', error);
            });
        }
});


