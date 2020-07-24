const express = require('express');
const router = express.Router();

const controller = require('./controller');
const { succes, error } = require('../../../network/response');

router.get('/', (req, res) => {
    const { page, random } = req.query;
    controller.getAlbums(page, random)
        .then(data => {
            succes(req, res, data, 200);
        })
        .catch(err => {
            error(req, res, 'Internal error', 500, err);
        }) 
})

router.get('/:idAlbum', (req, res) => {
    const { idAlbum } = req.params;
    controller.getAlbum(idAlbum)
        .then(data => {
            succes(req, res, data, 200);
        })
        .catch(err => {
            error(req, res, 'Internal error', 500, err);
        })
})

router.post('/', (req, res) => {
    const { album } = req.body;
    controller.addAlbum(album)
        .then(data => {
            succes(req, res, data, 201);
        })
        .catch(err => {
            error(req, res, 'Internal error', 500, err);
        }) 
})

module.exports = router;