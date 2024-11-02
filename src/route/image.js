const { Router } = require("express");
const upload = require("../middleware/upload");
const image = require("../controller/image");

const router = new Router()

router.post("/create", upload.single("image"), image.createImage)
router.post("/update", upload.single("image"), image.updateImage)
router.get("/:id", image.getImage)

module.exports = router

/**
 * @swagger
 * /api/image/create:
 *   post:
 *     summary: Создать 
 *     tags: [Фото]
 *     responses:
 *       200:
 *         description: form-data
 *         content:
 *           application/json:
 *             example:
 *              {image: ""}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *             message: "Bad Request" 
 * 
 * /api/image/update:
 *   put:
 *     summary: Редактировать 
 *     tags: [Фото]
 *     responses:
 *       200:
 *         description: form-data
 *         content:
 *           application/json:
 *             example:
 *              {image: "", id: 123}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *             message: "Bad Request" 
 * 
 * /api/image/:id:
 *   get:
 *     summary: Фото 
 *     tags: [Фото]
 *     responses:
 *       200:
 *         description: form-data
 *         content:
 *           application/json:
 *             example:
 *              {}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *             message: "Bad Request" 
 * 
  */