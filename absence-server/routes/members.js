const express = require("express");
const router = express.Router();
const data = require("../../api/api");

router.get("/:userid", (req, res) => {
  data.members().then((rows) => {
    const user = rows.filter((row) => row.userId === req.params.userid * 1.0);
    res.json(user);
  });
});

router.get("/", (req, res) => {
  data.members().then((rows) => res.json(rows));
});

module.exports = router;
