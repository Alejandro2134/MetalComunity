const albumRouter = require('../routes/album/network');
const commentRouter = require('../routes/comment/network');
const reviewRouter = require('../routes/review/network');
const userRouter = require('../routes/user/network');

const routesApi = (app) => { 
    app.use('/albums', albumRouter);
    app.use('/comments', commentRouter);
    app.use('/reviews', reviewRouter);
    app.use('/user', userRouter);
}

module.exports = routesApi;