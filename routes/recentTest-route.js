const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (req,res)=>{
    const profileDetail = await User.findOne({_id:req.user ? req.user._id : req.session.user._id});
    // const fetchedData = await  accountData.findOne({userId : req.session._id}) ;

    res.render("test", {profileDetail}) ;
});

module.exports = router ;