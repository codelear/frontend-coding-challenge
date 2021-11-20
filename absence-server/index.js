
const express = require("express");
const app = express();
const absence_router = require("./routes/absences")
const members_router = require("./routes/members");

app.use("/absences", absence_router);
app.use("/members", members_router);

app.get("/", (req, res) => { res.redirect("/absences") })

app.listen(5000);
