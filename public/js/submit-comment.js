async function submitCommentHandler(event) {
    event.preventDefault();

    const postId = document.querySelector('.post').getAttribute('data-id');
    const text = document.querySelector('[name="comment"]').value.trim();

    if (text) {
        console.log(postId);
        const response = await fetch(
            `/api/post/${postId}/comment/`,
            {
                method: 'POST',
                body: JSON.stringify({
                    text
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.ok) {
            document.location.reload();
        } else {
            alert((await response.json()).message);
        }
    } else {
        alert('Must have text to make comment');
    }
}

document.querySelector('#comment-form').addEventListener(
    'submit',
    submitCommentHandler
);
