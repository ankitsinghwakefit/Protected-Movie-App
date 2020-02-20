var express = require('express');
var router = express.Router();
var User = require("../model/user");
var auth = require("../middleware/auth");
var Movie = require("../model/user2");

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.post('/login', function(req, res, next) {
  var {email, password} = req.body;
  User.findOne({email: email},(err,user)=>{
    
    if(err) { return next(err)};
    if(!user) return res.redirect("/");
    if(!user.verifyPassword(password)) return res.redirect("/");
    req.session.userId = user.id;
    res.redirect("/movie");
  })
});

/* GET Register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get("/login",(req,res)=>{
  res.render("index");
})

/* GET login page. */
router.post("/register",(req,res)=>{
  User.create(req.body,(err,usercreated)=>{
    if(!err){res.redirect("/login")}
    console.log(err);
  })
})

// router.get("/no",(req,res)=>{
//   res.send("unouthorised");
// })
router.use(auth.restrictUnauthorisedUse);


router.get("/logout",(req,res)=>{
  req.session.destroy();
  res.redirect("/");
})

router.get("/no",(req,res)=>{
  res.send("unouthorised");
})

router.get('/movie', function(req, res, next) {
  Movie.find((err,docs)=>{
    if(!err){
      res.render("movielist",{data:docs});
    }
    else{console.log("err in users")}
  })
  // res.render('index', { title: 'Movie | App' });
});

router.get('/movie/showdetails', function(req, res, next) {
  Movie.find((err,docs)=>{
    if(!err){
      res.render("showdetails",{data:docs});
    }
    else{console.log("err in users")}
  })
  // res.render('index', { title: 'Movie | App' });
});

router.get("/movie/moviedetails/:id",(req,res)=>{
  console.log(req.params.id);
  Movie.findById(req.params.id,(err,doc)=>{
    console.log(req.params.id);
    if(!err){
      res.render("moviedetails",{
        existingdata : doc,
      })
    }
    else{console.log(err)}
  });
});

router.get("/movie/addmovie",(req,res)=>{
  res.render("movieform");
});

router.post("/movie/movieform/:id",(req,res)=>{
  Movie.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,data)=>{
    if(err){console.log(err)}
    res.redirect("/movie");
  })
})

router.get("/movie/delete/:id",(req,res)=>{
  Movie.findByIdAndDelete(req.params.id,(err,data)=>{
    if(err){console.log(err)}
    res.redirect("/movie");
  })
});

router.post('/movie', function(req, res, next) {
  let data = req.body;
  Movie.create(data,(err,newuser)=>{
    if(err){console.log(err)}
    res.redirect("/movie");
  })
});

module.exports = router;
