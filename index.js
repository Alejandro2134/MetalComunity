const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const db = require('./db');
const config = require('./config');
const routesApi = require('./network/routes'); 

//App init
const app = express();

//Middlewares
app.use(helmet());
app.use(cors({
    origin: 'https://metalcommunity.vercel.app'
}));
app.use(bodyParser.json());

//Database
db(config.dbUrl);

//Routes Api
routesApi(app);

//Server
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});