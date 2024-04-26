const mongoose = require("mongoose");

require("dotenv").config;

const DB_Connect = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("Database connected successfully");
    }catch(error){
        console.log(error);
        console.log("Something went wrong")
    }
}

module.exports = DB_Connect;