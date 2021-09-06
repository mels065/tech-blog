function beginEditCommentHandler(event) {
    const id = event.target.dataset.commentId;
    
    document.querySelector(`#comment-form-${id}`).classList.remove('hide');
    document.querySelector(`#comment-display-${id}`).classList.add('hide');
}

document.querySelectorAll('.begin-edit-comment-btn').forEach(
    btn => btn.addEventListener('click', beginEditCommentHandler)
);
