const express = require('express');

const { User, Post, Comment } = require('../models');

const apiRouter = require('./api');

const withAuth = require('../utils/with-auth');

const router = express.Router();

router.use('/api', apiRouter);

router.get('/', async (req, res) => {
    try {
        const posts = (await Post.findAll({
            include: [User]
        })).map(postData => {
            const post = postData.get();
            const user = post.user.get();
            return {
                ...post,
                user
            }
        });
    
        res.render(
            'home',
            {
                posts,
                isLoggedin: req.session.is_loggedin
            }
        );
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/post/', withAuth, (req, res) => {
    res.render(
        'post-create',
        {
            heading: 'Dashboard',
            isLoggedin: req.session.is_loggedin
        }
    );
});

router.get('/post/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const postData = await Post.findByPk(
            id,
            { 
                include: [
                    User,
                    {
                        model: Comment,
                        include: [User]
                    }
                ]
            }
        );

        if (postData) {
            const post = postData.get();
            post.user = post.user.get();
            post.comments = post.comments.map(commentData => {
                const comment = commentData.get()
                comment.user = comment.user.get();
                return comment;
            });
            
            res.render(
                'post',
                {
                    post,
                    isLoggedin: req.session.is_loggedin
                }
            )
        } else {
            res.render(
                '404',
                {
                    isLoggedin: req.session.is_loggedin
                }
            );
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

router.get('/post/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (postData) {
            const post = postData.get();
            res.render(
                'post-edit',
                {
                    post,
                    isLoggedin: req.session.is_loggedin
                }
            )
        } else {
            res.render(
                '404',
                {
                    isLoggedin: req.session.is_loggedin
                }
            );
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const posts = (await Post.findAll(
            { where: { user_id: req.session.user_id } }
        )).map(post => post.get());
        res.render(
            'dashboard',
            {
                posts,
                heading: 'Dashboard',
                isLoggedin: req.session.is_loggedin
            }
        );
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

router.get('/login', (req, res) => {
    if (req.session.isLoggedin) {
        res.redirect('/');
    } else {
        res.render(
            'login',
            {
                heading: 'Login/Register'
            }
        );
    }
});

module.exports = router;
