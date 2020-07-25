const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');
const config = require('./config');
const { routesApi, routesViews } = require('./network/routes'); 

//App init
const app = express();

app.use(bodyParser.json());

//Database
db(config.dbUrl);

//Views
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//Public
app.use('/static', express.static(__dirname + '/public'));

//Routes Api
routesApi(app);

//Routes Views
routesViews(app);

//Server
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});