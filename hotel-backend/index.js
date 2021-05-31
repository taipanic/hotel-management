require("dotenv").config();

const {
  expressInfo,
  expressError,
  mongoInfo,
  mongoError,
} = require("./modules/debug");

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    mongoInfo("connected to mongodb");
    mongoose.connection.db.dropCollection("socketclients", (error, result) => {
      if (error) {
        return mongoError(error.message);
      } else if (result) return mongoInfo("dropped socketclients");
    });
  })
  .catch((error) => mongoError(error.message));

mongoose.connection.on("error", (error) => {
  mongoError(error);
});

const httpServer = require("./modules/app");

const port = process.env.PORT || 3001;
httpServer.listen(port);

httpServer.on("listening", () => {
  expressInfo("listening on port", port);
});

httpServer.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      expressError("port " + port + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error("port " + port + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});
