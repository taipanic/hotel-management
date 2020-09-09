var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
  name: {
    type: Number,
    required: true,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value'
    }
  },
  state: {
    type: Boolean,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Floor",
    required: true
  }
});

module.exports = mongoose.model("Room", roomSchema);