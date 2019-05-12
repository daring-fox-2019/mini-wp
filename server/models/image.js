const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageSchema = new Schema({
    image: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    uploadedAt: Date,
    tags: Array,
});
const Image = mongoose.model('Image', imageSchema)
module.exports = Image