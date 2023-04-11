const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const market = express()

require("dotenv").config()

market.use(express.json())
market.use(bodyParser.json())
market.use(bodyParser.urlencoded({extended: true}))

market.use(cookieParser())
market.use(express.static(path.join(__dirname, "static")))
market.set("views", path.join(__dirname, "views"))
market.set("view engine", "ejs")

const defaultRoute = require("./routes/index")
const testRoute = require("./routes/api/test")
const profile = require("./routes/profile")


market.use("/", defaultRoute)
market.use("/api/test", testRoute)
market.use("/profile", profile)

market.listen(3000)