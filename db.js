const db = require('mongoose');

db.Promise = global.Promise;

const connect = async (url) => {
    await db.connect(url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('[db] Conectada con éxito');
}

module.exports = connect;