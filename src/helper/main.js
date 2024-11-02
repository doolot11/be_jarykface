const { secret } = require("../config")
const jwt = require("jsonwebtoken")


const generateAccessToken = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: "1d" })
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: "30d" })
}

