const mongoose = require('mongoose');

const { Schema } = mongoose;

const tagSchema = new Schema({
  title: {
    type: String,
    required: [true, 'required'],
    validate: {
      validator: function(val) {
        return Tag.findOne({
          title: val
        })
          .then(tag => {
            if (tag) return false;
          })
          .catch(err => {
            throw err;
          })
      },
      message: props => 'not unique'
    }
  },
  created: Date
})

let Tag = mongoose.model('Tag', tagSchema);


module.exports = Tag;