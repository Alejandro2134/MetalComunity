const Model = require('./model');

const getAlbums = async (page, random) => {
    if(random) {
        const response = await Model.aggregate([
            { $sample: { size: random } }
        ])
        return response;
    } else {
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
            
        const data = await Model.paginate({}, options);
        return data;
    }
}

const getAlbum = async (idAlbum) => {
    const response = await Model.findById(idAlbum);
    return response; 
}

const addAlbum = async (album) => {
    const newAlbum = new Model(album);
    await newAlbum.save();
}

module.exports = {
    get: getAlbums,
    getAlbum: getAlbum,
    add: addAlbum,
}