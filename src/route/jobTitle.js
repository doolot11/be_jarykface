const { Router } = require("express");
const jobTitle = require("../controller/jobTitle");


const router = new Router()

router.post("/create", jobTitle.creaetJobTitle)
router.put("/update", jobTitle.updateJobTitle)

module.exports = router

/**
 * @swagger
 * /api/job-title/create:
 *   post:
 *     summary: Создать 
 *     tags: [Должность]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {title: ""}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * 
 * /api/job-title/update:
 *   put:
 *     summary: Редактировать 
 *     tags: [Должность]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {title: "", id: 123}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */ 