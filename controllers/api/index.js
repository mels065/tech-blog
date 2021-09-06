const express = require('express');

const userRouter = require('./user-routes');
const postRouter = require('./post-routes');
const commentRouter = require('./comment-routes');

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/post', postRouter);
apiRouter.use('/comment', commentRouter);

module.exports = apiRouter;
