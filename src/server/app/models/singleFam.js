let mongoose = require('mongoose')

var SFRawSchema = mongoose.Schema({
    year: Number,
    month: Number,
    day: Number,
    time: String,
    amount: Number
},
{ 
    strict: false
})

module.exports = mongoose.model('SFRawSchema', SFRawSchema)