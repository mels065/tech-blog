async function deleteCommentHandler(event) {
    if (confirm('Delete this comment?')) {
        const id = event.target.dataset.commentId;

        const response = await fetch(
            `/api/comment/${id}`,
            {
                method:'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Could not delete comment');
        }
    }
}

document.querySelectorAll('.delete-comment-btn').forEach(
    btn => btn.addEventListener('click', deleteCommentHandler)
);
