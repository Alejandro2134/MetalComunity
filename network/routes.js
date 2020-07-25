const albumRouter = require('../routes/api/album/network');
const commentRouter = require('../routes/api/comment/network');
const reviewRouter = require('../routes/api/review/network');
const userRouter = require('../routes/api/user/network');
const apiRouter = require('../routes/api');

const routesApi = (app) => {   
    app.use('/api', apiRouter);
    app.use('/api/albums', albumRouter);
    app.use('/api/comments', commentRouter);
    app.use('/api/reviews', reviewRouter);
    app.use('/api/user', userRouter);
}

const index = require('../routes/views/index');

const routesViews = (app) => {
    app.use('/index', index);
}

module.exports = {
    routesViews,
    routesApi
}