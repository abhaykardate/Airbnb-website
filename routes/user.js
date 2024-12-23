const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");
// signup
router.route("/signup")
.get(userController.renderSignUpForm)
.post( wrapAsync(userController.signup))
//log in

router.route("/login")
.get( userController.renderLogInForm ) 
.post(
    saveRedirectUrl,
    passport.authenticate("local" , {
        failureRedirect:"/login",
        failureFlash:true,

    }),
   userController.logIn
)
// log out 
router.get("/logout" , userController.logOut )

module.exports = router;
