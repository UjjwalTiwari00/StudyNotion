 const Section =require("../models/Section")
 const Course=require("../models/Course")
 const SubSection=require("../models/SubSection")

 exports.createSection=async (req,res)=>{
    try{
        // data fetch
        const {sectionName,courseId}=req.body;
        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:'all fields are required',
            })
        }
        // create section
        const newSection=await Section.create({sectionName});
         // update course with section ObjectId
        const updatedCourseDetail=await Course.findByIdAndUpdate(
                courseId,
                {
                    $push:{
                        courseContent:newSection._id,
                    },
                    
                },
                {new:true}
                
        ).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        })
        .exec();
       
        // retutn response
        res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourseDetail,
		});
    }
    catch(error){
        res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
 }

 exports.updateSection=async (req,res)=>{
    try{
        const {sectionName,sectionId}=req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:'all fields are required',
            })
        }
        const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        return res.status(200).json({
            success:true,
           message:'section udated successfully',
        })
    }catch(e){
        res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
 }

 exports.DeleteSection=async(req,res)=>{
    try{
        const {sectionId,courseId}=req.body;
        const sectionDelete=Section.findByIdAndDelete(sectionId);

       
        return res.status(200).json({
            success:true,
           message:'section deleted successfully',
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