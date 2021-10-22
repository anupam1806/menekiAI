const isAuthenticated = (req,res,next)=>{
    if(req.session && (req.session.user || req.user )){
        next();
    }else{
        res.redirect('/');
    }
};
module.exports = {
    isAuthenticated
}