const jwt = require("jsonwebtoken")

module.exports = {
    generate: (user) => {
        return jwt.sign({
            user
        }, process.env.SECRET, {
            issuer: "The Server 😂",
            expiresIn: process.env.EXPIRES_IN
        })
    },
    verify: token => {
        return jwt.verify(token, process.env.SECRET)
    }
}