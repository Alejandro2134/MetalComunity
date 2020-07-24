const express = require('express');
const router = express.Router();
const { succes, error } = require('../../../network/response');
const controller = require('./controller');

router.post('/signup', (req, res) => {
    const newUser = req.body;
    controller.addUser(newUser)
        .then(data => {
            succes(req, res, data, 201);
        })
        .catch(err => {
            error(req, res, 'Internal error', 500, err);
        })
})

router.post('/login', (req, res) => {
    const user = req.body.login;
    controller.logInUser(user)
        .then(data => {
            succes(req, res, data, 200);
        })
        .catch(err => {
            error(req, res, 'Internal error', 500, err)
        })
})

module.exports = router;