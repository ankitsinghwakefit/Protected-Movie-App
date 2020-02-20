var User = require("../model/user");

function checkAuth(req,res,next){
    if(req.session && req.session.userId){
        User.findById(req.session.userId, (err, CurrentUser)=>{
            if(err) return console.log(err);
            req.session.CurrentUser = CurrentUser;          
        })
    } else {
        req.session.CurrentUser = null;
    }
    next();
}

function restrictUnauthorisedUse(req,res,next){
    if(req.session && req.session.userId){
        next();
    } else {
        res.redirect("/login");
    }
}

module.exports = {
    checkAuth,
    restrictUnauthorisedUse
}