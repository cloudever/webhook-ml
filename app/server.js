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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Sends service info
app.get('/', (req, res) => {
    res.send(`${pkg.name}-svc ${pkg.version} ok`)
})

// Routes entrypoint for webhook
app.use('/webhook', router({ api: ml }));

app.use((req, res) => {
    res.status(404).send('404 / Not found')
})

app.use((req, res) => {
    res.status(500).send('500 / Server error')
})

const PORT = process.env.PORT || 3000
const IP = process.env.IP || '0.0.0.0'

const start = () => {
    app.listen(PORT, IP, (err) => {
        if (err) {
            return console.error (err.message);
        }
        
        console.log('Server started at ' + IP + ':' + PORT)
    })
}

if (module.parent) {
    exports.start = start
} else {
    start()
}
