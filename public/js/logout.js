async function logoutHandler() {
    const response = await fetch(
        '/api/user/logout',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    console.log(response);

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Unable to logout');
    }
}

document.querySelector('#logout').addEventListener(
    'click',
    logoutHandler
);
