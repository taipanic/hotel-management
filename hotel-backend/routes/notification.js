const express = require("express");

const {
  expressInfo,
  expressError,
  mongoError,
  mongoInfo,
} = require("./../modules/debug");

const SocketClient = require("./../models/socketclient");

module.exports = function (io) {
  const router = express.Router();

  router.post("/", (req, res) => {
    expressInfo("post to /notification");

    const { siteId, channels } = req.body;

    expressInfo("data for", siteId, "is", channels);

    SocketClient.find({ refSite: siteId })
      .exec()
      .then((socketClients) => {
        if (socketClients.length) {
          mongoInfo("found", socketClients.length, "socketClients");

          for (socketClient of socketClients) {
            io.of("/")
              .to(socketClient.socketId)
              .emit("update", JSON.stringify(channels));
          }
        } else expressInfo("no client found to notify");

        return res.sendStatus(200);
      })
      .catch((error) => {
        mongoError("cannot find clients to notify:", error);
        return res.sendStatus(400);
      });
  });

  return router;
};
