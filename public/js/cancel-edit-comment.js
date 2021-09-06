function cancelEditCommentHandler(event) {
    event.preventDefault();

    const id = event.target.dataset.commentId;

    document.querySelector(`#comment-display-${id}`).classList.remove('hide');
    document.querySelector(`#comment-form-${id}`).classList.add('hide');
}

document.querySelectorAll('.cancel-edit-comment-btn').forEach(
    btn => btn.addEventListener('click', cancelEditCommentHandler)
)
