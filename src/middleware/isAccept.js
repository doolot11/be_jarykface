const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
            return;
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: "Пользователь не авторизован" });
            }
            const { role } = jwt.verify(token, secret);
            console.log(role);
            let hasRole = false;
            roles.filter(i => {
                if (i === role) {
                    hasRole = true;
                }
            });
            console.log("is 403");

            if (!hasRole) {
                return res.status(400).json({ message: "У вас нет доступа" });
            }
            next();
        } catch (error) {
            return res.status(403).json({ message: "Произашло ошибка!" });
        }
    }
}
