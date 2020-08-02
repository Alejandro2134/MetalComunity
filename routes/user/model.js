const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const mySchema = new Schema({
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    user_name: { 
        type: String, 
        required: true 
    },
    created: { 
        type: String, 
        default: moment().format('DD/MM/YYYY')
    }
})

const model = mongoose.model('User', mySchema);
module.exports = model;