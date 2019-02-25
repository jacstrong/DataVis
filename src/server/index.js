"use strict"

let express = require('express')
let http = require('https')
let Router = require('./Router')
let fs = require('fs')
let parse = require('csv-parse')
let date = require('date-fns')
let app = express()
// let server = http.createServer(app)

let port = process.env.PORT || 9000;

let router = express.Router()

router.use((req, res, next) => {
    console.log(req.originalUrl)
    next()
})

let homeDataFile = './data/single-fam.csv'

let homeData = []
let homeDataProcessed = []
router.route('/fam')
    .get((req, res) => {
        let lastdate = ''
        let sum = 0
        // let avgNum = 0
        fs.createReadStream(homeDataFile)
            .pipe(parse({
                comment: '#',
                delimiter: ','
            }))
            .on('data', (row) => {
                console.log(row)
                let time = row[0].prototype.substring(0, 17)
                if (time === lastdate) {
                    sum += row[1]
                } else {
                    homeData.push([lastdate, sum])
                    lastdate = row[0].prototype.substring(0, 17)
                    sum = 0
                }
            })
            .on('end', () => {
                console.log(homeData)
                res.set('Content-Type', 'application/json')

                res.send(JSON.stringify(homeData))
            })
            .on('error', (error) => {
                console.log(error)
            })
    })

app.use('/api', router)

app.use(express.static('./public'))

app.use((req, res, next) => {
  res.status(404)
  res.send('Page not found.')
})

// server.listen(9000)
app.listen(port, () => console.log('Server started on localhost:9000\n'))
