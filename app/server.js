/* Internals */
const path = require("path")

/* Externals */
const express = require("express")
const bodyParser = require("body-parser")

/* Locals */
const router = require("./router")
const mailerlite = require("./mailerlite/api")

const pkg = require(path.resolve('./', './package.json'))

const ml = mailerlite({
    key: process.env.MAILERLITE_APIKEY
})

const app = express()

app.disable('x-powered-by')

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

// Sends service info
app.get('/', (req, res) => {
    res.send(`${pkg.name}-svc ${pkg.version} ok`, 200)
})

// Routes entrypoint for webhook
app.use('/webhook', router({ api: ml }));

app.use((req, res) => {
    res.send('404 / Not found', 404)
})

app.use((req, res) => {
    res.send('500 / Server error', 500)
})

const start = () => {
    app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', (err) => {
        if (err) {
            return console.error (err.message); process.exit(1);
        }
        console.log('Server started at ' + process.env.IP + ':' + process.env.PORT)
    })
}

if (module.parent) {
    exports.start = start
} else {
    start()
}
