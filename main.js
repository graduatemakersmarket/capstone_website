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

// Page routes
const defaultRoute = require("./routes/index")
const accountCreate = require("./routes/artists/create")
const accountLogin = require("./routes/artists/login")
const profile = require("./routes/profile")

// API routes
const accountCreateEndpoint = require("./routes/api/artists/create")
const accountLoginEndpoint = require("./routes/api/artists/login")


// Initialize pages
market.use("/", defaultRoute)
market.use("/artists/create", accountCreate)
market.use("/artists/login", accountLogin)
market.use("/profile", profile)

// Initialize endpoints
market.use("/api/artists/create", accountCreateEndpoint)
market.use("/api/artists/login", accountLoginEndpoint)

// Catch 404 errors

// Listen for incoming connections
market.listen(3000)