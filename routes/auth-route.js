const bcrypt = require('bcryptjs');
const User = require('../models/User')
const registerController = async function(req, res){
  let registerErrors = [];
  const {username,password,conf_password}=req.body;
  if(!username || !password || !conf_password){
    registerErrors.push({msg:'Fill the empty field !'})
  }
  if(password.length < 8){
    registerErrors.push({msg:'Password must be 8 character !'})
  }
  if(password !== conf_password){
    registerErrors.push({msg:'Password not matched !'})
  }
  if(registerErrors.length > 0){
    res.render('landing',{registerErrors})
  }
  else{
    const fetchUser = await User.findOne({ username: username });
    if (fetchUser) {
      registerErrors.push({msg:`${username} is already exist !`});
      res.render('landing', { registerErrors, username });
    }else{
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password,salt);
      const newUser = await new User({
        username:username,
        password:hashedPass
      });
      await newUser.save();
      req.session.user = newUser;
      console.log(req.session);
      res.redirect('/dashboard');
    }
}
};

const loginController = async function(req, res){
  console.log(req.body);
  let loginErrors = [];
  const {username,password}=req.body;
  if(!username || !password){
    loginErrors.push({msg:'Fill the empty field !'})
  }
  if(password.length < 8){
    loginErrors.push({msg:'Password must be 8 character !'})
  }
  if(loginErrors.length > 0){
    res.render('landing',{loginErrors})
  }
  else{
    const fetchUser = await User.findOne({ username: username });
        if (!fetchUser) {
          loginErrors.push({msg:`${username} is not registered yet !`});
          res.render('landing', { loginErrors, username });
        }
        else {
            const validPass = await bcrypt.compare(password, fetchUser.password);
            if (!validPass) {
              loginErrors.push({msg:'Check ur password !'});
              res.render('landing', { loginErrors, username });
            }
            else {
                req.session.user = fetchUser;
                console.log(req.session);
                res.redirect('/dashboard');
            }
        }
  }
};

const logoutController = function(req, res){
  req.logout();
  req.session.destroy();
  res.redirect("/");
};


module.exports = {
registerController,
loginController,
logoutController
};