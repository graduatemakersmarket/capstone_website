// Import required componments
const path = require("path")
const fs = require("fs")

const avatarFile = "../resources/images/avatar.png"
const avatarLocation = path.resolve(__dirname, avatarFile)

const defaultAvatar = fs.readFileSync(avatarLocation)

module.exports = {
    defaultAvatar
}