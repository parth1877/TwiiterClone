const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
    },
    password: {
        type: String,
        required: true,
    },
    bookmarks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // Use "User" with capital U as it's the model name
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
