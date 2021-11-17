const mongoose = require('mongoose');
const TestSchema = new mongoose.Schema({
    email:{
        type:String
    },
    name:{
        type:String
    },
    tName:{
        type:String
    },
    temail:{
        type:String
    },
    temail:{
        type:String
    },
    id:{
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
module.exports = mongoose.model("test", TestSchema);