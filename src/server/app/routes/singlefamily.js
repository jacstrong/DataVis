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


app.get('/daily', (req, res) => {
    res.set('Content-Type', 'application/json')
    
    SFDaily.find({}, function (err, result) {
        
        res.send(result)
    })
    
    // console.log(SFDaily.find())
    // res.send()
})

module.exports = app