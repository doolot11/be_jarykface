const { Router } = require("express");
const schedule = require("../controller/schedule");

const router = new Router

router.post("/create", schedule.createSchedule)

module.exports = router