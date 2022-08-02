const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true,
        minLength: 3,
        maxLength: 25,
    },
    fullname:{
        type: String,
        default: "",
        minLength: 3,
        maxLength: 25,
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("user", userSchema)