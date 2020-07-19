const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const mongoosePaginate = require('mongoose-paginate-v2');

autoIncrement.initialize(mongoose.connection);

const mySchema = new Schema({
    band_name: { type: String, required: true },
    name: { type: String, required: true },
    genre: [String],
    image: { type: String, required: true },
    rating: { type: Number, default: 0.0 },
    buy_links: [String],
    reviews: [String],
    comments: [String],
    created: { type: Date, default: Date.now }
})

mySchema.plugin(mongoosePaginate);
mySchema.plugin(autoIncrement.plugin, {
    model: 'Album',
    startAt: 1,
});
const model = mongoose.model('Album', mySchema);
module.exports = model;