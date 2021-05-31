const router = require("express").Router();
const { expressInfo, expressError } = require("../modules/debug");
const axios = require("axios");

const iotAppUrl = process.env.IOT_APP_URL;

const channelsUrl = iotAppUrl + "/channels";

router.post("/", (req, res) => {
  expressInfo("post to /channels");

  axios
    .post(channelsUrl, req.body)
    .then((response) => res.json(response.data))
    .catch((error) => {
      expressError(error.message);
      return res.sendStatus(400);
    });
});

router.get("/", (req, res) => {
  expressInfo("get to /channels");

  const { refFloor, refRoom, channelId } = req.query;

  if (refRoom) {
    axios
      .get(channelsUrl, {
        params: {
          refGateway: refRoom,
        },
      })
      .then((response) => res.json(response.data))
      .catch((error) => {
        expressError(error);
        return res.sendStatus(400);
      });
  } else if (refFloor) {
    expressInfo("get channels with refFloor");
    getChannels(refFloor)
      .then((channels) => res.json(channels))
      .catch((error) => {
        expressError(error);
        return res.sendStatus(400);
      });
  } else {
    axios
      .get(channelsUrl, {
        params: {
          refGateway: refRoom,
          channelId,
        },
      })
      .then((response) => res.json(response.data))
      .catch((error) => {
        expressError(error.message);
        res.sendStatus(400);
      });
  }
});

const getChannels = async (refFloor) => {
  const channels = [];

  const response = await axios.get(iotAppUrl + "/gateways", {
    params: {
      refSite: refFloor,
    },
  });

  await Promise.all(
    response.data.map(async (gateway) => {
      const response = await axios.get(channelsUrl, {
        params: {
          refGateway: gateway.id,
        },
      });
      channels.push(...response.data);
    })
  );

  return channels;
};

module.exports = router;
