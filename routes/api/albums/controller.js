const store = require('./store');

const getAlbums = () => {
    return new Promise((resolve, reject) => {
        resolve(store.get());
    })
}

const getAlbum = () => {
    return new Promise((resolve, reject) => {

    })
}

const addAlbum = (album) => {
    return new Promise((resolve, reject) => {
        if(!album) {
            console.error('[message controller] no hay datos del album');
            reject('Incomplete data');
            return false;
        }

        resolve(store.add(album));
    })
}

module.exports = {
    getAlbums,
    getAlbum,
    addAlbum
}