const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username:{
        type:String
    },
    password: {
        type:String
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    subject:{
        type:String
    },
    class:{
        type:String
    },
    submitDate:{
        type:Date,
        default:Date.now
    },
    totalMarks:{
        type:String
    }
});
module.exports = mongoose.model("user", UserSchema);