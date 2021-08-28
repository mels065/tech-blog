async function loginHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#login-form [name="email"]').value.trim();
    const password = document.querySelector('#login-form [name="password"]').value.trim();

    if (email && password) {
        const response = await fetch(
            '/api/user/login',
            {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.ok) {
            document.location.assign('/');
        } else {
            alert((await response.json()).message);
        }
    } else {
        alert('Please provide email and password to login');
    }
}

document.querySelector('#login-form').addEventListener(
    'submit',
    loginHandler
);
