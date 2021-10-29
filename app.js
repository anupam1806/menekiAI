require('dotenv').config({path:__dirname+'/.env'})
const express = require("express");
const ejs = require("ejs");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

app.set('view engine', 'ejs');
app.set('x-powered-by', false);

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true, 
  useUnifiedTopology: true,
}).then(()=>console.log('MongoDB is connected !'))
.catch(err=>console.log(err))

const sessionStore = new MongoStore({
  mongooseConnection:mongoose.connection,
  collection:'sessions'
});

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  name:'sid',
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  store:sessionStore,
  cookie:{
    httpOnly:true,
    maxAge:1000 * 60 * 60 * 24
  }
}));

app.use(passport.initialize());
app.use(passport.session());


const {isAuthenticated} = require('./config/ensureAuth');

const User = require('./models/User');

app.get("/", function(req, res){
    res.render("landing");
  });

app.get("/dashboard",isAuthenticated,async function(req, res){
  const profileDetail = await User.findOne({_id:req.user ? req.user._id : req.session.user._id});
  console.log(req.user);
    res.render("dashboard",{user:req.user,profileDetail});
});

app.use('/account',isAuthenticated,require('./routes/account-route')) ;
app.use('/createtest',isAuthenticated,require('./routes/createTest-route')) ;

app.post("/register",require('./routes/auth-route').registerController);

app.post("/login",require('./routes/auth-route').loginController);

app.get("/logout", require('./routes/auth-route').logoutController);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
