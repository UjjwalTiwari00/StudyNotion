const mongoose=require('mongoose');

const ProgileSchema=new mongoose.Schema({
    gender:{
        type:String,
        enum:["Male","Female"]
    },
    dateOfBirth:{
        type:String,
    },
    about:{
        type:String,
        trim:true,
    },
    contactNumber:{
        type:Number,
        trim:true,
    }
})


module.exports=mongoose.model('Profile',ProgileSchema);