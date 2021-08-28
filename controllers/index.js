const express = require('express');

const { User, Post } = require('../models');

const apiRouter = require('./api');

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
                heading: 'Tech Blog',
                posts,
                isLoggedin: req.session.is_loggedin
            }
        );
    } catch (err) {
        res.status(500).json(err.message);
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
