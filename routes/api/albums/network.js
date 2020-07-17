const express = require('express');
const router = express.Router();

const controller = require('./controller');
const { succes, error } = require('../../../network/response');

router.get('/', (req, res) => {
    const { page } = req.query;
    controller.getAlbums(page)
        .then(data => {
            succes(req, res, data, 200);
        })
        .catch(err => {
            error(req, res, 'Internal error', 500, err);
        }) 
})

router.get('/:idAlbum', (req, res) => {
    const { idAlbum } = req.params;
    res.json({id: idAlbum});
})

router.post('/', (req, res) => {
    const album = req.body;
    controller.addAlbum(album)
        .then(data => {
            succes(req, res, data, 200);
        })
        .catch(err => {
            error(req, res, 'Internal error', 500, err);
        }) 
})

module.exports = router;