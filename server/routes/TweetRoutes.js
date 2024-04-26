const express = require("express");
const router = express.Router();
const isAunthenticated = require("../middlewares/Auth");
const tweetController = require("../controllers/tweetController")



router.post("/create",isAunthenticated,tweetController.createTweet)
router.delete("/delete/:id",isAunthenticated,tweetController.deleteTweet)
router.put("/like/:id",isAunthenticated,tweetController.likeOrdislike)
router.get("/getAllTweets/:id",isAunthenticated,tweetController.getAlltweets)
router.get("/getFollowingTweets/:id",isAunthenticated,tweetController.getFollowingTweet)

module.exports = router;