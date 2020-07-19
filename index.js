const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');
const config = require('./config');
const routesApi = require('./network/routes'); 

//App init
const app = express();

app.use(bodyParser.json());

//Database
db(config.dbUrl);

//Routes Api
routesApi(app);

//Server
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});