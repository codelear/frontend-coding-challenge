const express = require("express");
const router = express.Router();
const data = require("../../api/api");

const RESULTS_PER_PAGE = 10;

let absence_data = {};
data.absences().then((res) => {
  absence_data = res;
});

router.get("/", (req, res) => {
  let pagenumber = 1;

  if (req.query["pagenumber"] != undefined) {
    pagenumber = req.query["pagenumber"] * 1;
  }

  res.json({
    payload: absence_data.slice(
      (pagenumber - 1) * RESULTS_PER_PAGE,
      (pagenumber - 1) * RESULTS_PER_PAGE + RESULTS_PER_PAGE
    ),
    pagenumber: pagenumber,
    totalpages: Math.ceil(absence_data.length / RESULTS_PER_PAGE),
  });
});

module.exports = router;
