const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const mongoosePaginate = require('mongoose-paginate-v2');
const moment = require('moment');

autoIncrement.initialize(mongoose.connection);

const mySchema = new Schema({
    user: { 
        type: String,
        required: true
    },
    content: { 
        type: String, 
        minlength: 70, 
        maxlength: 280, 
        required: true 
    },
    album_id: { 
        type: Number, 
        required: true 
    },
    created: { 
        type: String, 
        default: moment().format('DD/MM/YYYY')
    }
})

mySchema.plugin(mongoosePaginate);
mySchema.plugin(autoIncrement.plugin, {
    model: 'Comment',
    startAt: 1,
});
const model = mongoose.model('Comment', mySchema);
module.exports = model;