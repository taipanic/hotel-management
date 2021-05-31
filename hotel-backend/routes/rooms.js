const express = require("express");
const router = express.Router();
const axios = require("axios");

const roomsUrl = process.env.IOT_APP_URL + "/gateways";

const { expressError, expressInfo } = require("../modules/debug");

router.post("/", (req, res) => {
  expressInfo("post to /rooms/");

  const { refFloor, name } = req.body;

  if (!refFloor || !name) {
    expressError("lack of refFloor or name");
    return res.sendStatus(400);
  }

  axios
    .post(roomsUrl, { refSite: refFloor, name })
    .then((response) => res.json(response.data))
    .catch((error) => {
      expressError(error);
      return res.sendStatus(400);
    });
});

router.get("/", (req, res) => {
  expressInfo("get to /rooms/");

  const { roomId, apikey, refFloor } = req.query;

  axios
    .get(roomsUrl, {
      params: {
        ...(roomId && { gatewayId: roomId }),
        ...(apikey && { apikey }),
        ...(refFloor && { refSite: refFloor }),
      },
    })
    .then((response) => res.json(response.data))
    .catch((error) => {
      expressError(error);
      return res.sendStatus(400);
    });
});

module.exports = router;
