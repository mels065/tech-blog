async function editPostHandler(event) {
    event.preventDefault();

    const url = document.location.href.split('/');
    const id = url[url.length - 1];
    const title = document.querySelector('[name="title"]').value.trim();
    const text = document.querySelector('[name="text"]').value.trim();

    if (title && text) {
        const response = await fetch(
            `/api/post/${id}`,
            {
                method: 'PUT',
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

document.querySelector('#edit-post-form').addEventListener(
    'submit',
    editPostHandler
);
