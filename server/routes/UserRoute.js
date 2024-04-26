const express = require("express");


const userController = require("../controllers/userController");
const isAunthenticated = require("../middlewares/Auth");

const router = express.Router();

router.post("/signUp",userController.signUp);
router.post("/login",userController.login);
router.get("/logout",userController.logout);
router.put("/bookmark/:id",isAunthenticated,userController.bookmarktweets)
router.get("/getProfile/:id",isAunthenticated,userController.getProfile);
router.get("/otherUsers/:id",isAunthenticated,userController.getOtherUsers);
router.post("/follow/:id",isAunthenticated,userController.follow);
router.post("/unfollow/:id",isAunthenticated,userController.unfollow);


module.exports =  router;