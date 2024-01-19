const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
require('dotenv').config()
const errorHandler = require('./middleware/error-handling-middleware')
const app = express()
const socket = require('socket.io')
const initSocket = require('./io')
const path = require('path')
const aimRouter = require('./routes/aim-router')

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use('/', aimRouter)
app.use('/server', routes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.use(errorHandler)

const server = app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})

global.io = socket(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
    },
})

initSocket()
