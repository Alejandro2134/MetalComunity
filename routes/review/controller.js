const store = require('./store');
const config = require('../../config');
const fetch = require('node-fetch');

const addReview = (idAlbum, user_name, review) => {
    return new Promise (async (resolve, reject) => {
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
        
        const reviewsCount = await fetch(`${config.url}/reviews/${idAlbum}`);
        const { body: { info } } = await reviewsCount.json();

        const ratingInfo = await fetch(`${config.url}/albums/${idAlbum}`);
        const { body: { rating: currentRating } } = await ratingInfo.json();

        const normalRating = currentRating * info.count;
        const newRating = (normalRating + review.rating) / (info.count + 1);

        const body = { newRating: { rating: (() => {
            if(Number.isInteger(newRating)) {
                return newRating;
            }

            return newRating.toFixed(1);
        })() } }

        await fetch(`${config.url}/albums/${idAlbum}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        
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