const Profile=require("../models/Profile")
const user=require("../models/User")

exports.updateProfile=async (req,res)=>{
    try{
        // get data
        const {dateOfBirth="",about="",gender,contactNumber}=req.body
        // get userid
        const ID=req.user.id;
        // validation
        if(!gender || !contactNumber){
            return res.status(400).json({
                success:false,
                message:'all fields are required',
            })
        }
        //find profile 
        const UserDeatil=await user.findById(ID)
        const profileID=UserDeatil.additionalDetails;
        const profileDetail=await Profile.findById(profileID);
        //update profile
        profileDetail.dateOfBirth=dateOfBirth;
        profileDetail.about=about;
        profileDetail.gender=gender;
        profileDetail.contactNumber=contactNumber;
        await profileDetail.save();
        //return response
        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            profileDetail,
        })
    }
    catch(e){
        res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}


// 
exports.deleteAccount=async(req,res)=>{
    try{
        // get id
        const id=req.user.id
        // validation
        const userDetail=await user.findById(id);

        if(!userDetail){
            return res.status(400).json({
                success:false,
                message:'user not found',
            })
        }
        // delete profile
        await Profile.findByIdAndDelete({_id:userDetail.additionalDetails});
        // delete user
        await user.findByIdAndDelete({_id:id});

        // get all users

        // return response
        return res.status(200).json({
            success:true,
            message:"user deleted successfully",
           
        })
    }catch(e){
        res.status(500).json({
			success: false,
			message: "user not found",
			error: error.message,
		});
    }
}

exports.getAllUserDetails=async (req,res)=>{
    try{
        const id=req.user.id

        const userDetails=await user.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success:true,
            message:"user data fetched successfully",
        })
    }
    catch(error){
        res.status(500).json({
			success: false,
			message: "data cannot be fetched",
			error: error.message,
		});
    }
}