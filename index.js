// Load environment from a .env file
require("dotenv").load()

// Define `bluebird` as a default `Promise` library
global.Promise = require("bluebird")

// Adds absolute resolver path
// require('app-module-path').addPath( __dirname )

// Create server instance
const server = require("./app/server")
server.start()