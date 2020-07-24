const store = require('./store');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../config');

const addUser = (newUser) => {
    return new Promise ((resolve, reject) => {
        const userPassword = newUser.password;

        bcrypt.hash(userPassword, 10)
            .then(hash => {
                newUser.password = hash;
                resolve(store.add(newUser))
                    .catch(err => {
                        reject(err);
                    })
            })
            .catch(err => reject(err))
    }) 
}

const logInUser = (user) => {
    return new Promise ((resolve, reject) => {
        if(!user) {
            reject('Provide a user');
            return false;
        }

        store.logIn(user)
            .then(data => {
                bcrypt.compare(user.password, data.password)
                    .then(result => {
                        if(result) {
                            const payload = { sub: user.user_name }
                            const token = jwt.sign(payload, config.userJwtSecret, {
                                expiresIn: '15m',
                            }) 
                            resolve(token);
                        } else {
                            reject('Incorrect password');
                        }
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
            .catch(err => {
                reject(err);
            })
    })
}

module.exports = {
    addUser,
    logInUser,
}