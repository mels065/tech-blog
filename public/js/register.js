async function registerHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#register-form [name="username"]').value.trim();
    const email = document.querySelector('#register-form [name="email"]').value.trim();
    const password = document.querySelector('#register-form [name="password"]').value.trim();
    const repeatPassword = document.querySelector('#register-form [name="repeat-password"]').value.trim();

    if (password !== repeatPassword) {
        alert("Passwords do not match");
    } else if (username && email && password) {
        const response = await fetch(
            '/api/user/register',
            {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.ok) {
            document.location.assign('/');
        } else {
            alert("Unable to register");
        }
    } else {
        alert("Must provide username, email, and password to register");
    }
}

document.querySelector('#register-form').addEventListener(
    'submit',
    registerHandler
);
