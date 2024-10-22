const tags=require("../models/tags");

exoprts.createTag=async(req,res)=>{
    try{
        //fetch data
        const {name,description}=req.body;
        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:'all fields are required',
            })
        }
        //create the entry in db
        const tagDetails=await tags.create({
            name:name,
            description:description,
        });
        console.log(tagDetails);
        // return kr diya
        return res.status(200).json({
            success:true,
            message:'tag created successfully',
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            message: e.message
        })
    }
}

exports.ShowAllTags=async(req,res)=>{
    try{
        // tag se hamne data liya ahi but specific data nahi chaiye kuch lekin name aur description true kiya hai
        const allTags=await tags.find({},{name:true,desciption:true});
    res.status(200).json({
        success:true,
        message:"All tags returned successfully",
        allTags
    })
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message: e.message,
        })
    }
}
  