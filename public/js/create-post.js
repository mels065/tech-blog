async function createPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('[name="title"]').value.trim();
    const text = document.querySelector('[name="text"]').value.trim();

    if (title && text) {
        const response = await fetch(
            '/api/post',
            {
                method: 'POST',
                body: JSON.stringify({ title, text }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        if (response.ok) {
            document.location.assign('/dashboard');
        } else {
            alert((await response.json()).message);
        }
    } else {
        alert("Must provide title and text for the post");
    }
}

document.querySelector('#create-post-form').addEventListener(
    'submit',
    createPostHandler
);
