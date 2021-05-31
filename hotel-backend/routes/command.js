const express = require("express");
const router = express.Router();
const axios = require("axios");

const { expressInfo, expressError } = require("../modules/debug");

const iotAgentUrl = process.env.IOT_APP_URL;

router.post("/", (req, res) => {
  expressInfo("post to /command");

  const { refRoom, channels } = req.body;

  if (!refRoom || !channels || !channels.length) {
    expressError("Lack of refRoom or channels");
    return res.sendStatus(400);
  }

  axios
    .post(iotAgentUrl + "/command", { refGateway: refRoom, channels })
    .then((response) => {
      expressInfo(response.data);
      return res.json(response.data);
    })
    .catch((error) => {
      expressError(error.message);
      return res.sendStatus(400);
    });
});

module.exports = router;
