async function finishEditCommentHandler(event) {
    event.preventDefault();
    
    const id = event.target.dataset.commentId;

    const text = document.querySelector(`#comment-form-${id} [name="comment"]`).value.trim();

    const response = await fetch(
        `/api/comment/${id}`,
        {
            method:'PUT',
            body: JSON.stringify({ text }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Could not edit comment');
    }
}

document.querySelectorAll('.finish-edit-comment-btn').forEach(
    btn => btn.addEventListener('click', finishEditCommentHandler)
);
