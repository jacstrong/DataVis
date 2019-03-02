let mongoose = require('mongoose')

var SFDailySchema = mongoose.Schema({
    year: Number,
    month: Number,
    day: Number,
    amount: Number
},
{ 
    strict: false
})

module.exports = mongoose.model('SFDailySchema', SFDailySchema)