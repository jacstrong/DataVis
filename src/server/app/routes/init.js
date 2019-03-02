let fs = require('fs')
let parse = require('csv-parse')
let date = require('date-fns')
let mongoose = require('mongoose')

let express = require('express')
let app = express()

let SFRaw = require('../models/singleFam')
let SFDaily = require('../models/singleFamDaily')

app.get('/', (req, res) => {
    res.send('init')
})


let homeDataFile = './data/single-fam.csv'


app.get('/fam', (req, res) => {
    SFDaily.collection.drop()
    
    
    let dailySum = 0
    let dailyNumber = 0
    let lastDay = ''
    let avgNum = 0
    let first = true
    
    let totalDays = 0
    
    fs.createReadStream(homeDataFile)
        .pipe(parse({
            comment: '#',
            delimiter: ','
        }))
        .on('data', (row) => {
            // console.log(row)
            if (first) {
                lastDay = row[0].substring(8, 10)
                first = false
            }
            
            if (lastDay !== row[0].substring(8, 10)) {
                
                avgNum = dailySum
                
                lastDay = row[0].substring(8, 10)
                dailySum = Number(row[1])
                dailyNumber = 1
                
                ++totalDays
                console.log(totalDays)
                console.log("average: " + avgNum.toString())
                console.log(row[0].substring(8, 10))
                
                let year = row[0].substring(0, 4)
                let month = row[0].substring(5, 7)
                let day = row[0].substring(8, 10)
                // let time = row[0].substring(11, 19)
                let amount = avgNum
                
                let sfdaily = new SFDaily({
                    year: year,
                    month: month,
                    day: day,
                    amount: amount
                })
                
                sfdaily.save()
                .then(result => {
                    console.log('written to db');
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                })
            } else {
                dailySum += Number(row[1])
                ++dailyNumber
            }
            
        })
        .on('end', () => {
            console.log("done")
            res.set('Content-Type', 'application/json')

            res.send({
                message: 'Finished Successfully',
                
            })
        })
        .on('error', (error) => {
            console.log(error)
        })
})

module.exports = app