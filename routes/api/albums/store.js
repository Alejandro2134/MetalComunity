const Model = require('./model');

const getAlbums = async (page, random) => {

    if(random && page) {
        return 'Use only one query';
    } else {
        if(random) {
            try {
                const num = Number.parseInt(random);
                const data = await Model.aggregate([
                    { $sample: { size: num } }
                ])
                return data;
            } catch(err) {
                return err;
            }
        } else {
            try {
                const count = await Model.countDocuments({});
        
                if(page > Math.ceil(count / 20)) {
                    throw 'There is nothing here';
                } else {
        
                    const prev = page - 1;
                    const next = page + 1;
        
                    const limit = () => {
                        if(page && page != 0) {
                            return page * 20
                        } else {
                            return 20;
                        }
                    }
        
                    const init = () => {
                        if(page && page != 0) {
                            return (prev * 20) + 1
                        }else {
                            return 1;
                        }
                    }
        
                    const data = await Model.find({ _id: { $gte: init(), $lte: limit() } }).exec();
                
                    const response = {
                        info: {
                            count: count,
                            pages: Math.ceil(count / 20),
                            next: page < Math.ceil(count / 20) 
                                    ? page == 0 
                                        ?  Math.ceil(count / 20) > 1
                                            ? 'http://localhost:3000/api/albums?page=2'
                                            : null
                                        : `http://localhost:3000/api/albums?page=${next}` 
                                    : null,
                            prev: page > 1 ? `http://localhost:3000/api/albums?page=${prev}` : null
                        },
                        results: data
                    }
                
                    return response;
                }
            } catch (err) {
                return err;
            }
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