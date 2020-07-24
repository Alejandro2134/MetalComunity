const store = require('./store');

const addComment = (idAlbum, user_name, content) => {
    return new Promise ((resolve, reject) => {
        if(!idAlbum || !user_name || !content) {
            reject('Incomplete data');
            return false;
        }

        const newComment = {
            user: user_name,
            album_id: idAlbum,
            content: content
        } 

        resolve(store.add(newComment));
    })
}

const getCommentsAlbum = (idAlbum, page) => {
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
                        next: data.nextPage ? `http://localhost:3000/api/comments/${idAlbum}?page=${data.nextPage}` : null,
                        prev: data.prevPage ? `http://localhost:3000/api/comments/${idAlbum}?page=${data.prevPage}` : null
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
    addComment,
    getCommentsAlbum
}   