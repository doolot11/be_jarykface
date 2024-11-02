const { Router } = require("express");

const router = new Router()

const User = require("../route/user")
const JobTitle = require("../route/jobTitle")
const Schedule = require("../route/schedule")
const Image = require("../route/image")

router.use("/user", User)
router.use("/job-title", JobTitle)
router.use("/schedule", Schedule)
router.use("/image", Image)

module.exports = router