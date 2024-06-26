const announcements=require('../models/announcement');
const signup=require('../models/signup');

const announceController=async(req,res)=>{
    const {hostel_name,announcement,isAdmin}=req.body;
    if(!hostel_name ){
        return res.status(422).json({error:"Hostel Name is required"});
    }
    if(!announcement ){
        return res.status(422).json({error:"Announcement is required"});
    }
    if(!isAdmin &&isAdmin!==false){
        return res.status(422).json({error:"isAdmin is required"});
    }
    const newAnnounce=new announcements({hostel_name,announcement,isAdmin});
    await newAnnounce.save();
    res.status(201).json(newAnnounce);
}
module.exports=announceController;