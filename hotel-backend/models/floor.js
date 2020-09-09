var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var floorSchema = new Schema({
  name: {
    type: Number,
    min: 1,
    max: 99,
    required: true,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value'
    }
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room"
    }
  ]
});

module.exports = mongoose.model("Floor", floorSchema);