const zod = require("zod");
const  User  = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const Tweet = require("../models/Tweet")
const emailChecker = zod.string().email();
const minlengthPassword = zod.string().min(6);

const signUp = async (req, res) => {
    try {
        const { name, userName, email, password } = req.body;
        console.log(name,userName,email,password);
        if (!name || !userName || !email || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            });
        }

        if (!emailChecker.safeParse(email)) {
            return res.status(400).json({
                success: false,
                msg: "Enter a correct email address"
            });
        }

        if (!minlengthPassword.safeParse(password)) {
            return res.status(400).json({
                success: false,
                msg: "Minimum password length is 6 characters"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                msg: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name:name,
            userName:userName,
            email:email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            msg: "Account created successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Something went wrong"
        });
    }
};


const login = async (req,res)=>{
    try{

        const {email,password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            });
        }

        if (!emailChecker.safeParse(email)) {
            return res.status(400).json({
                success: false,
                msg: "Enter a correct email address"
            });
        }

        if (!minlengthPassword.safeParse(password)) {
            return res.status(400).json({
                success: false,
                msg: "Minimum password length is 6 characters"
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                msg:"User does not exists,pls register first"
            })
        }

        const passwordCheck = await bcrypt.compare(password,user.password);

        if(!passwordCheck){
            return res.status(500).json({
                success:false,
                msg:"Wrong password"
            })
        }

        

        const token = await jwt.sign({userId : user._id},process.env.JWT_SECRET,{expiresIn:"1d"})

        user.password ="";

        return res.status(200).cookie(
            "token",
            token,
            {
                expiresIn:"1d",
                httpOnly:true,
                secure:true,
                sameSite:"None"
            }
        ).json({
            success:true,
            msg:`Welcome ${user.name}`,
            user
        })




    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            msg:"Something went wrong"
        })
    }
}


const logout = (req,res)=>{
    return res.cookie("token","",{expiresIn:new Date(Date.now()),secure:true,sameSite:"None"}).json({
        success:true,
        msg:"Logout successfully"
    })
}


const bookmarktweets = async(req,res)=>{
    try {
        const loggedInUserID = req.body.id;
        const tweetID = req.params.id;

        const tweet = await Tweet.findById(tweetID);

        if(!tweet){
            return res.status(200).json({
                success:false,
                msg:"Tweet does not exists"
            })
        }
        
        const user = await User.findById(loggedInUserID);

        if(!user){
            return res.status(200).json({
                success:false,
                msg:"User does not exists"
            })
        }

        if(user.bookmarks.includes(tweetID)){
            await User.findByIdAndUpdate(loggedInUserID,{$pull:{bookmarks:tweetID}})
            return res.status(200).json({
                success:true,
                msg:"Removed bookmarked tweet successfully"
        })
        }else{
            await User.findByIdAndUpdate(loggedInUserID,{$push:{bookmarks:tweetID}})
            return res.status(200).json({
                success:true,
                msg:"Bookmarked tweet successfully"
            })
        }

        

    } catch (error) {
        console.log(error)
    }
}

const getProfile = async (req,res) => {
    try {
        const id = req.params.id;
        const user = await User.findById( {_id:id} ).select("-password");
        if (!user) {
            return res.status(409).json({
                success: false,
                msg: "User does not exists"
            });
        }



        return res.status(200).json({
            user:user,
            success:true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Something went wrong",
            success:"false"
        })
    }
}

const getOtherUsers = async(req,res)=>{
    try {
        const {id} = req.params;
        const otherUsers = await User.find({_id:{$ne:id}}).select("-password")

        if(!otherUsers){
            return res.status(500).json({
                success:false,
                msg:"There are no other users"
            })
        }

        return res.status(200).json({
            success:true,
            data:otherUsers,
            msg:"Other users"
        })
    } catch (error) {
        
    }
}


const follow = async (req,res) =>{
    try {
        const loggedInUserid = req.body.id;
        const userID = req.params.id;

        const loggedInUser = await User.findById(loggedInUserid);
        const user = await User.findById(userID);

        if(!user.followers.includes(loggedInUserid)){
            await user.updateOne({$push:{followers:loggedInUserid}});
            await loggedInUser.updateOne({$push:{following:userID}});

        }else{
            return res.status(400).json({
                msg:`User already followed to ${user.name}`
            })
        }

        return res.status(200).json({
            msg:`${loggedInUser.name} is started follwing ${user.name}`,
            success:true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:`${error}`,
            success:false
        })
    }
}


const unfollow = async (req,res) =>{
    try {
        const loggedInUserid = req.body.id;
        const userID = req.params.id;

        const loggedInUser = await User.findById(loggedInUserid);
        const user = await User.findById(userID);

        if(loggedInUser.following.includes(userID)){
            await user.updateOne({$pull:{followers:loggedInUserid}});
            await loggedInUser.updateOne({$pull:{following:userID}});

        }else{
            return res.status(400).json({
                msg:`User is not following ${user.name}`
            })
        }

        return res.status(200).json({
            msg:`${loggedInUser.name} is started unfollwing ${user.name}`,
            success:true
        })
    } catch (error) {
        console.log(error)
        console.log(error)
        return res.status(500).json({
            msg:`${error}`,
            success:false
        })
    }
}



module.exports = {
    signUp,
    login,
    logout,
    bookmarktweets,
    getProfile,
    getOtherUsers,
    follow,
    unfollow
};

