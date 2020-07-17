const Model = require('./model');

const getAlbums = async () => {
    const data = Model.find({});
    return data;
}

const addAlbum = (album) => {
    const newAlbum = new Model(album);
    newAlbum.save();
}

module.exports = {
    get: getAlbums,
    add: addAlbum,
}