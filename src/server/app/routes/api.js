let express = require('express')
let app = express()

app.get('/api', (req, res, next) => {
    res.set('Content-Type', 'application/json')
    res.send(JSON.stringify({
        type: 'data'
    }))
})