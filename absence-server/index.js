
const express = require('express')
const app = express()
const absenceRouter = require('./routes/absences')
const membersRouter = require('./routes/members')

app.use('/absences', absenceRouter)
app.use('/members', membersRouter)

app.get('/', (req, res) => { res.redirect('/absences') })

app.listen(5000)
