const { expressError, expressInfo } = require("./../modules/debug");

const express = require("express");
const router = express.Router();

const mqttClient = require("./../modules/mqtt");

router.post("/", (req, res) => {
  expressInfo("post to /mqtt/");

  const { topic, message } = req.body;

  expressInfo(message);

  const parsedObject = JSON.parse(message);
  expressInfo(parsedObject);

  const newString = JSON.stringify(parsedObject);
  expressInfo(newString);

  mqttClient.publish(topic, newString);

  return res.sendStatus(200);
});

module.exports = router;
