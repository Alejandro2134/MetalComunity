const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const mySchema = new Schema({
    band_name: { type: String, required: true },
    name: { type: String, required: true },
    genre: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0.0 },
    buy_links: [String],
    reviews: [String],
    comments: [{
        body: { type: String, minlength: 70, maxlength: 280 },
        date: {
            type: Date,
            default: Date.now
        },
        user: { type: Number, ref: 'User' }
    }],
    created: { type: Date, default: Date.now }
})

mySchema.plugin(autoIncrement.plugin, {
    model: 'Album',
    startAt: 1,
});
const model = mongoose.model('Album', mySchema);
module.exports = model;