const express = require("express");
const DB_Connect = require("./config/Database");
const cookieParser = require("cookie-parser");
const UserRoute = require("./routes/UserRoute")
const TweetRoutes = require("./routes/TweetRoutes")
const cors = require("cors");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;

DB_Connect();

app.use(express.json());
app.use(cookieParser());    
const corsOptions = {
    origin:"http://localhost:3000",
    credentials:true
}

app.use(cors(corsOptions));

app.use("/api/v1/user",UserRoute);
app.use("/api/v1/tweet",TweetRoutes)

app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`)
})
