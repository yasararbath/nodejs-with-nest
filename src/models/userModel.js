const mongoose = require('mongoose');

const Schema = mongoose.Schema({
        createdAt: Date,
        firstName:String,
        password: String,
        email: String,
        updatedAt: Date,
        lastName: String
})

module.exports = mongoose.model("users", Schema);