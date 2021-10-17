require('dotenv').config({path:__dirname+'/.env'})
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.set('x-powered-by', false);

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true, 
  useUnifiedTopology: true,
}).then(()=>console.log('MongoDB is connected !'))
.catch(err=>console.log(err))

app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get("/", function(req, res){
    res.render("landing");
  });

app.get("/dashboard", function(req, res){
    res.render("dashboard");
  });

app.post("/register",require('./routes/auth-route').registerController);

app.post("/login",require('./routes/auth-route').loginController);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
