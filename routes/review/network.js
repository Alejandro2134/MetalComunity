const express = require('express');
const router = express.Router();
const auth = require('express-jwt');
const controller = require('./controller');
const config = require('../../config');
const { succes, error } = require('../../network/response');

router.post('/:idAlbum', auth({ secret: config.userJwtSecret, algorithms: ['HS256'] }), (req, res) => {
    const { idAlbum } = req.params;
    const { sub: user_name } = req.user;
    const { review } = req.body;

    controller.addReview(idAlbum, user_name, review)
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
    
    controller.getReviewsAlbum(idAlbum, page)
        .then(data => {
            succes(req, res, data, 200);
        })
        .catch(err => {
            error(req, res, 'Internal error', 500, err);
        })
})

module.exports = router;