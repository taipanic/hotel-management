const express = require("express");
const router = express.Router();
const axios = require("axios");

const floorsUrl = process.env.IOT_APP_URL + "/sites";

const { expressError, expressInfo } = require("../modules/debug");

router.post("/", (req, res) => {
  expressInfo("post to /floors/");

  const { name } = req.body;

  axios
    .post(floorsUrl, { name })
    .then((response) => {
      return res.json(response.data);
    })
    .catch((error) => {
      expressError(error);
      return res.sendStatus(400);
    });
});

router.get("/", (req, res) => {
  expressInfo("get to /floors/");

  const { floorId } = req.query;

  axios
    .get(floorsUrl, {
      params: {
        ...(floorId && { siteId: floorId }),
      },
    })
    .then((response) => {
      return res.json(response.data);
    })
    .catch((error) => {
      expressError(error);
      return res.sendStatus(400);
    });
});

module.exports = router;
