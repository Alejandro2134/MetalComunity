const Model = require('./model');

const addComment = async (comment) => {
    const newComment = new Model(comment);
    await newComment.save({ validateBeforeSave: true });
}

const getCommentsAlbum = async (idAlbum, page) => {
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
    add: addComment,
    get: getCommentsAlbum
}