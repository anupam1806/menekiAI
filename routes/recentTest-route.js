const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (req,res)=>{
    const testDetail = await User.findOne({_id:req.user ? req.user._id : req.session.user._id});

    res.render("test", {testDetail}) ;
    
});

router.post("/",async(req,res)=>{
    const testDetail = await User.findOne({_id:req.user ? req.user._id : req.session.user._id});
      testDetail.firstName = req.body.firstName || testDetail.firstName;
      testDetail.lastName = req.body.lastName || testDetail.lastName;
      testDetail.subject = req.body.subject || testDetail.subject;
      testDetail.class = req.body.class || testDetail.class;
      testDetail.submitDate = req.body.submitDate || testDetail.submitDate;
      testDetail.totalMarks = req.body.pincode || testDetail.pincode;
      await testDetail.save();
      res.redirect('/recent') ;
  })

module.exports = router ;