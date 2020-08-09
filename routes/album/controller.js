const store = require('./store');
const config = require('../../config');

const getAlbums = (page, random) => {
    return new Promise((resolve, reject) => {
        if(page && random) {
            reject('Use only one query');
            return false;
        } else {
            page = Number.parseInt(page);
            random = Number.parseInt(random);

            store.get(page, random)
                .then(data => {
                    if(random) {
                        resolve(data);
                    } else {
                        const response = {
                            info: {
                                count: data.totalDocs,
                                pages: data.totalPages,
                                next: data.nextPage ? `${config.url}/albums?page=${data.nextPage}` : null,
                                prev: data.prevPage ? `${config.url}/albums?page=${data.prevPage}` : null
                            },
                            results: data.docs
                        }
    
                        resolve(response);
                    }
                })     
                .catch(err => {
                    reject(err);
                })
        }
    })
}

const getAlbum = (idAlbum) => {
    return new Promise((resolve, reject) => {
        resolve(store.getAlbum(idAlbum));
    })
}

const addAlbum = (album) => {
    return new Promise((resolve, reject) => {
        if(!album) {
            console.error('[album controller] no hay datos del album');
            reject('Incomplete data');
            return false;
        }

        resolve(store.add(album));
    })
}

const updateAlbum = (newRating, idAlbum) => {
    return new Promise((resolve, reject) => {
        if(!newRating || !idAlbum) {
            console.error('[album controller] no hay datos del album');
            reject('Incomplete data');
            return false;
        }

        resolve(store.update(newRating, idAlbum));
    })
}

module.exports = {
    getAlbums,
    getAlbum,
    addAlbum,
    updateAlbum
}