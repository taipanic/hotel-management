const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  refFloor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Floor",
  },
});

module.exports = mongoose.model("room", roomSchema);
