const Websocket = require('ws')
const express = require('express')
const app = express()
const path = require('path')

app.use('/', express.static(path.resolve(__dirname, '../client')))
const server = app.listen(9876)

const wss = new Websocket.Server({
    server
})

wss.on('connection', function(ws) {
    ws.on('message', function incoming(data,isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === Websocket.OPEN) {
                if (client !== ws) client.send(data, { binary: isBinary })
            }
        })
    })
})