const mongoose=require('mongoose');
const {Schema}=mongoose;
const bcrypt=require('bcrypt');
const Signup=require('./signup');
const announcementSchema=new Schema({
    hostel_name:{
        type:String,
        required:true
    },
    announcement:{
        type:String,
        required:true
    },
    isAdmin:{
        ref:'Signup',
        type:Schema.Types.ObjectId

    }
})
module.exports=mongoose.model('announcement',announcementSchema);
