const router = require('express').Router();
const User = require('../models/User');
const Test = require('../models/CreateTest');

router.get('/', async (req,res)=>{
    const testDetail = await Test.findOne({_id:req.user ? req.user._id : req.session.user._id});
    // const fetchedData = await  accountData.findOne({userId : req.session._id}) ;

    res.render("createtest", {testDetail}) ;
});

router.post("/",async(req,res)=>{
    const testDetail = await Test.findOne({_id:req.user ? req.user._id : req.session.user._id});
      testDetail.email = req.body.email || testDetail.email;
      testDetail.name = req.body.name || testDetail.name;
      testDetail.tname = req.body.tname || testDetail.tname;
      testDetail.temail = req.body.temail || testDetail.temail;
      testDetail.id = req.body.id || testDetail.id;
      testDetail.submitDate = req.body.submitDate || testDetail.submitDate;
      testDetail.totalMarks = req.body.totalMarks || testDetail.totalMarks;
      await testDetail.save();
      res.redirect('/createtest') ;
  })

module.exports = router ;