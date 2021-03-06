const express = require('express');

const { Comment } = require('../../models');

const withAuth = require('../../utils/with-auth');

const commentRouter = express.Router();

commentRouter.put('/:id', withAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByPk(id);

        if (!comment) {
            res.status(404).json({ message: 'Comment does not exist and cannot be editted' });
        } else if (comment.user_id !== req.session.user_id) {
            res.status(401).json({ message: 'Current user cannot edit comment' });
        } else {
            const { text } = req.body;
            await Comment.update(
                {
                    text
                },
                { where: { id } }
            );
            res.json({ message: 'Comment has been updated' });
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message })
    }
});

commentRouter.delete('/:id', withAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByPk(id);
        if (!comment) {
            res.status(404).json({ message: 'Could not delete comment because it does not exist' });
        } else if (req.session.user_id !== comment.user_id) {
            res.status(401).json({ message: "The current user does not have authorization to delete this comment" });
        } else {
            await Comment.destroy(
                { where: { id } }
            );
            res.json({ message: 'Comment successfully deleted' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = commentRouter;
