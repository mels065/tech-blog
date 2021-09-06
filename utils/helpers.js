module.exports = {
    format_date(date) {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    },

    is_current_user_comment(currentUserId, commentUserId) {
        return currentUserId === commentUserId;
    }
};
