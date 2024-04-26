const jwt = require("jsonwebtoken")

require("dotenv").config();

const isAunthenticated = async (req,res,next)=>{
    try{

        const {token} = req.cookies;

        if(!token){
            return res.status(500).json({
                success:false,
                msg:"User is not authenticated"
            })
        }

        const decode = await jwt.verify(token,process.env.JWT_SECRET)
        console.log(decode);
        
        req.userID = decode.userID;

        next();


    }catch(error){
        console.log(error);
        res.status(500).json({
            msg:"Something went wrong inside auth",
            success:false,
        })
    }
}

module.exports = isAunthenticated;