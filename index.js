const mongoose = require('mongoose');
const app = require('./server');

mongoose.connect("mongodb://0.0.0.0:27017/jest-test")
.then(()=>{
    console.log("db connected")
    app.listen('3550',()=>{
        console.log('listening to port - 3550')
    })
}).catch(err=>{
    console.log(err)
})
