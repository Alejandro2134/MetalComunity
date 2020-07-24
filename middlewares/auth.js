const jwt = require('jsonwebtoken');
const { userJwtSecret } = require('../config');
const { error } = require('../network/response');

module.exports = async (req, res, next) => {

    const { token } = req.body;

    if(token) {
        jwt.verify(token, userJwtSecret, (err, decoded) => {
            if(err) {
                error(req, res, 'Invalid token', 500, err);
            } else {
                req.params.user_name = decoded.sub;
                next();
            }
        })
    } else {
        error(req, res, 'Token not provided', 500, 'Token not providedW');
    }

}