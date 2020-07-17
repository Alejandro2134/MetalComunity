const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./db');
const config = require('./config');
const { routesApi, routes } = require('./network/routes'); 

//App init
const app = express();

app.use(bodyParser.json());

//Database
db(config.dbUrl);

//Static files
app.use('/static', express.static(path.join(__dirname, 'public')));

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Routes Api
routesApi(app);

//Routes
routes(app);

//Server
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});