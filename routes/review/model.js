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
        minlength: 1500, 
        required: true 
    },
    album_id: { 
        type: Number, 
        required: true 
    },
    created: { 
        type: String, 
        default: moment().format('DD/MM/YYYY')
    },
    rating: {
        type: Number,
        required: true
    }
})

mySchema.plugin(mongoosePaginate);
mySchema.plugin(autoIncrement.plugin, {
    model: 'Review',
    startAt: 1,
});
const model = mongoose.model('Review', mySchema);
module.exports = model;