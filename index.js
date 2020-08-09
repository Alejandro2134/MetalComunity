const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const db = require('./db');
const config = require('./config');
const routesApi = require('./network/routes'); 

//App init
const app = express();

var whitelist = ['https://metalcommunity.vercel.app/*'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//Middlewares
app.use(helmet());
if(process.env.NODE_ENV === 'production') {
    app.use(cors(corsOptions));
}
app.use(bodyParser.json());

//Database
db(config.dbUrl);

//Routes Api
routesApi(app);

//Server
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});