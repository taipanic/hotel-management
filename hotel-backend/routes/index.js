const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  return res.json("OK");
});

module.exports = router;
