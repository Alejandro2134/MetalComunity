const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const controller = require('./controller');
const { succes, error } = require('../../network/response');

router.post('/:idAlbum', auth, (req, res) => {
    const { idAlbum, user_name } = req.params;
    const { content } = req.body;

    controller.addComment(idAlbum, user_name, content)
        .then(data => {
            succes(req, res, data, 201);
        })
        .catch(err => {
            error(req, res, 'Internal error', 500, err);
        })
})

router.get('/:idAlbum', (req, res) => {
    const { idAlbum } = req.params;
    const { page } = req.query;
    
    controller.getCommentsAlbum(idAlbum, page)
        .then(data => {
            succes(req, res, data, 200);
        })
        .catch(err => {
            error(req, res, 'Internal error', 500, err);
        })
})

module.exports = router;