const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true,
    },
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    userDetailes:{
        type:Array,
        default:[],
    },
    
},{timestamps:true})

const Tweet = mongoose.model("Tweet",TweetSchema);

module.exports = Tweet;