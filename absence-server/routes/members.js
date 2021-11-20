const express = require("express");
const router = express.Router();
const data = require("../../api/api");

let members_data = {};
data.members().then((res) => {
  members_data = res;
});

router.get("/:userid", (req, res) => {
  const user = members_data.filter(
    (row) => row.userId === req.params.userid * 1.0
  );
  res.json(user);
});

router.get("/", (req, res) => {
  res.json(members_data);
});

module.exports = router;
