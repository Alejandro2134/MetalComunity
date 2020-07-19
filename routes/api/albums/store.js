const Model = require('./model');

const getAlbums = async (page, random) => {
    if(page && random) {
        return 'Use only one query';
    } else {
        if(random) {
            const num = Number.parseInt(random);
            const response = await Model.aggregate([
                { $sample: { size: num } }
            ])
            return response;
        } else {
            const options = {
                page: (() => {
                    if(!page || page == 0){
                        return 1;
                    } else {
                        return Number.parseInt(page);
                    }
                })(),
                limit: 10,
                collation: {
                    locale: 'en'
                }
            };
            
            const data = await Model.paginate({}, options);

            const response = {
                info: {
                    count: data.totalDocs,
                    pages: data.totalPages,
                    next: data.nextPage ? `http://localhost:3000/api/albums?page=${data.nextPage}` : null,
                    prev: data.prevPage ? `http://localhost:3000/api/albums?page=${data.prevPage}` : null
                },
                results: data.docs
            }

            return response;
        }
    }
}

const addAlbum = (album) => {
    const newAlbum = new Model(album);
    newAlbum.save();
}

module.exports = {
    get: getAlbums,
    add: addAlbum,
}