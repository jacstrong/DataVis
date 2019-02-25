// let express = require('express')

module.exports = [
    {
        path: '/api',
        handler: require('./app/routes/api')
    }
    // {
    //     path: '/api',
    //     handler: require('./app/routes/BooksRoute')
    // }
]