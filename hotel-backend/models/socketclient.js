var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const socketClientSchema = new Schema({
  socketId: {
    type: String,
    required: true,
  },
  refSite: {
    type: Schema.Types.ObjectId,
    ref: "Site",
    required: true,
  },
});

module.exports = mongoose.model("SocketClient", socketClientSchema);
