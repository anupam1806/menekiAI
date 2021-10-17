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
        const newUser = await new User({
          username:username,
          password:password
        });
        await newUser.save();
      
        res.redirect('/dashboard');
      }
  }
  };
  
const loginController = async function(req, res){
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
              if (!password) {
                loginErrors.push({msg:'Check ur password !'});
                res.render('landing', { loginErrors, username });
              }
              else {
                  res.redirect('/dashboard');
              }
          }
    }
  };
  

module.exports = {
  registerController,
  loginController,
};