const path = require('path');
require('dotenv').config({
    path: (() => {
        if(process.env.NODE_ENV == 'development'){
            return path.resolve(__dirname, '.env.development');
        }
    })() 
});

const config = {
    dbUrl: `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0-rtsr4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    userJwtSecret: process.env.AUTH_USER_JWT_SECRET,
    url: process.env.URL
}

module.exports = config;