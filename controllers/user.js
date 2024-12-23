const User = require("../models/user");


module.exports.renderSignUpForm = (req,res) =>{
    
    res.render("users/signup.ejs")
    

}
module.exports.signup =  async(req,res) =>{
    try{
    let {username , email , password} =  req.body;
    const newUser = new User ({email,username});
    const registedUser = await User.register(newUser , password);
console.log(registedUser);
req.login(registedUser, (err) =>{
    if(err) {
        return next(err);
    }
    req.flash("success" ,"Wellcome To Wanderlust");
    res.redirect("/listings"); 
});


}
catch(e) {
    req.flash("error", e.message);
    res.redirect("/signup");

}
}

module.exports.renderLogInForm =(req,res) =>{
    res.render("users/login.ejs");

}
module.exports.logIn =  async (req,res)=>{
    req.flash("success" ,"Welcome back Wanderlust! You Are Logged In");
let redirectUrl = res.locals.redirectUrl||"/listings"
res.redirect(redirectUrl);

}


module.exports.logOut =(req,res,next) =>{
    req.logout((err) => {
    if(err){
        return next(err)
    }
    req.flash("success" , "you are logged out!")
    res.redirect("/listings");
    })
}