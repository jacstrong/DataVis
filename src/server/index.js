"use strict"

let express = require('express')
let http = require('https')
// let Router = require('./Router')

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});


let app = express()
// let server = http.createServer(app)

let port = process.env.PORT || 3000;

// DB Setup
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('DB connection successful')
})

var allowCrossDomain = function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
}
app.use(allowCrossDomain)

app.use('/api', require('./app/routes/api'))

app.use(express.static('./public'))

app.use((req, res, next) => {
  res.status(404)
  res.send('Page not found.')
})

// server.listen(9000)
app.listen(port, () => console.log('Server started on localhost:8000\n'))
