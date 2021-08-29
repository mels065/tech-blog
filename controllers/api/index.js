const express = require('express');

const userRouter = require('./user-routes');
const postRouter = require('./post-routes');

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/post', postRouter);

module.exports = apiRouter;
