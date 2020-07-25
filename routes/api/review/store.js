const Model = require('./model');

const addReview = async (review) => {
    const newReview = new Model(review);
    await newReview.save({ validateBeforeSave: true });
}

const getReviewsAlbum = async (idAlbum, page) => {
    const options = {
        page: (() => {
            if(!page || page === 0){
                return 1;
            } else {
                return page;
            }
        })(),
        limit: 10,
        collation: {
            locale: 'en'
        }
    };
        
    const data = await Model.paginate({ album_id: idAlbum }, options);
    return data;
}

module.exports = {
    add: addReview,
    get: getReviewsAlbum
}