const albumsRouter = require('../routes/api/albums/network');
const apiRouter = require('../routes/api');

const routesApi = (app) => {   
    app.use('/api', apiRouter);
    app.use('/api/albums', albumsRouter);
}

const home = require('../routes/home');

const routes = (app) => {
    app.use('/', home);
}

module.exports = {
    routesApi,
    routes
}