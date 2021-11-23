const express = require('express')
const router = express.Router()
const data = require('../../api/api')

const RESULTS_PER_PAGE = 10

router.get('/', (req, res) => {
  let pageNumber = 1

  if (req.query.pagenumber !== undefined) {
    pageNumber = req.query.pagenumber * 1
  }

  data.absences().then((absenceData) => {
    res.json({
      payload: absenceData.slice(
        (pageNumber - 1) * RESULTS_PER_PAGE,
        (pageNumber - 1) * RESULTS_PER_PAGE + RESULTS_PER_PAGE
      ),
      pagenumber: pageNumber,
      totalpages: Math.ceil(absenceData.length / RESULTS_PER_PAGE)
    })
  })
})

module.exports = router
