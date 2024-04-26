const Tweet = require("../models/Tweet")
const User = require("../models/User")


const createTweet = async (req,res) => {
    try {

        const {description,id} = req.body;

        const user = await User.findById(id).select("-password");
        console.log(user)

        if(!user){
            return res.status(500).json({
                success:false,
                msg:"User does not exists"
            })
        }
        

        if(!description || !id){
            return res.status(401).json({
                success:false,
                msg:"All fields are required"
            })
        }

        await Tweet.create({description:description,userID:id,userDetailes:user});

        


        return res.status(200).json({
            success:true,
            msg:"Tweet created successfully"
        })


        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:error
        })
    }

}


const deleteTweet = async (req,res) =>{
    try {
        const {id} = req.params;

        await Tweet.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            msg:"Tweet deleted successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

const likeOrdislike = async(req,res)=>{
    try {
        const loggedInUserID = req.body.id;
        const tweetID = req.params.id;

        const tweet = await Tweet.findById(tweetID);
        
        if(tweet.like.includes(loggedInUserID)){
            await Tweet.findByIdAndUpdate(tweetID,{$pull:{like:loggedInUserID}})
            return res.status(200).json({
                success:true,
                msg:"Disliked tweet successfully"
            })
        }else{
            await Tweet.findByIdAndUpdate(tweetID,{$push:{like:loggedInUserID}})
            return res.status(200).json({
                success:true,
                msg:"Liked tweet successfully"
            })
        }

        

    } catch (error) {
        console.log(error)
    }
}

const getAlltweets = async(req,res)=>{
    try {
        // loggedInUserTweets + followingUserTweets
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const loggedInUserTweets = await Tweet.find({userID:id})
        const followingUserTweets = await Promise.all(loggedInUser.following.map(async(otherUserId)=>{
            return await Tweet.find({userID:otherUserId})
        }))

        return res.status(200).json({
            tweets:loggedInUserTweets.concat(...followingUserTweets)
        })


    } catch (error) {
        console.log(error)
    }
}

const getFollowingTweet = async(req,res) =>{
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const followingUserTweets = await Promise.all(loggedInUser.following.map(async(otherUserId)=>{
            return await Tweet.find({userID:otherUserId})
        }))

        return res.status(200).json({
            tweets:[].concat(...followingUserTweets)
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            msg:"Something went wrong"
        })
    }
}



module.exports = {createTweet,deleteTweet,likeOrdislike,getAlltweets,getFollowingTweet};