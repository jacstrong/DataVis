let express = require('express')
let app = express()

app.use('/init', require('./init.js'))
app.use('/singlefam', require('./singlefamily'))

app.get('/', (req, res, next) => {
    // res.set('Content-Type', 'application/json')
    res.send("hello")
})

module.exports = app