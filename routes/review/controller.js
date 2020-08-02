const store = require('./store');
const config = require('../../config');

const addReview = (idAlbum, user_name, review) => {
    return new Promise ((resolve, reject) => {
        if(!idAlbum || !user_name || !review) {
            reject('Incomplete data');
            return false;
        }

        const newReview = {
            user: user_name,
            album_id: idAlbum,
            content: review.content,
            rating: review.rating
        } 

        resolve(store.add(newReview));
    })
}

const getReviewsAlbum = (idAlbum, page) => {
    return new Promise ((resolve, reject) => {
        if(!idAlbum) {
            reject('Incomplete data');
            return false;
        }

        page = Number.parseInt(page);

        store.get(idAlbum, page)
            .then(data => {
                const response = {
                    info: {
                        count: data.totalDocs,
                        pages: data.totalPages,
                        next: data.nextPage ? `${config.url}/reviews/${idAlbum}?page=${data.nextPage}` : null,
                        prev: data.prevPage ? `${config.url}/reviews/${idAlbum}?page=${data.prevPage}` : null
                    },
                    results: data.docs
                }

                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    })
}

module.exports = {
    addReview,
    getReviewsAlbum
}   