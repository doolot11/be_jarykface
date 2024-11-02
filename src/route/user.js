const { Router } = require("express");
const user = require("../controller/user");
const isAccept = require("../middleware/isAccept");

const router = new Router()

//isAccept(["admin", "superAdmin", "employee"]), //Для разрешения запросов в зависимости от ролей

router.get("/get-all", user.getUsers)
router.post("/create", user.createUsers)
router.post("/sign-in", user.signIn)
router.post("/request-reset-pwd", user.requestResetPwd)
router.post("/reset-pwd", user.resetPassword)

module.exports = router

/**
 * @swagger
 * /api/user/get-all:
 *   get:
 *     summary: get all
 *     tags: [user]
 *     responses:
 *       200:
 *         description: Successful response
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
 *              message: "Bad Request"
 * 
 * /api/user/create:
 *   post:
 *     summary: Создать пользователь
 *     tags: [user]
 *     responses:
 *       200:
 *         description: Если роль не 'employee', то нужно отправить только первые четыре поля.
 *         content:
 *           application/json:
 *             example:
 *              {pwd, email, role, fullName, firstName, lastName, middleName, phoneNumber, birthday, ID, INN, faceId, jobTitleId,}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /api/user/sign-in:
 *   post:
 *     summary: Авторизация
 *     tags: [user]
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             example:
 *              {pwd, email }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /api/user/reset-pwd:
 *   post:
 *     summary: Востановление пароль
 *     tags: [user]
 *     responses:
 *       200:
 *         description: Если роль не 'superAdmin', то в поле code нужно отправить значение 1.
 *         content:
 *           application/json:
 *             example:
 *              {email, newPwd, code, }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /api/user/request-reset-pwd:
 *   post:
 *     summary: Для получения кода, отправленного на Gmail.
 *     tags: [user]
 *     responses:
 *       200:
 *         description: Только для роли 'superAdmin'.
 *         content:
 *           application/json:
 *             example:
 *              {email: "" }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */