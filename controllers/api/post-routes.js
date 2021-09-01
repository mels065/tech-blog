const express = require('express');

const { Post, Comment } = require('../../models');

const withAuth = require('../../utils/with-auth');
const { post } = require('./user-routes');

const postRouter = express.Router();

postRouter.post('/', withAuth, async (req, res) => {
    try {
        const post = (await Post.create(
            {
                ...req.body,
                user_id: req.session.user_id
            }
        )).get();
        res.json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

postRouter.put('/:id', withAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);
        if (post) {
            await Post.update(
                req.body,
                { where: { id } }
            );
            res.json({ message: 'Post successfully updated' });
        } else {
            res.status(404).json({ message: 'Could not update post because it does not exist' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

postRouter.post('/:id/comment', withAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);
        if (post) {
            const commentData = await Comment.create({
                ...req.body,
                post_id: id,
                user_id: req.session.user_id
            });
            res.json(commentData);
        } else {
            res.status(404).json({ message: 'Post does not exist and cannot be commented on' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = postRouter;
