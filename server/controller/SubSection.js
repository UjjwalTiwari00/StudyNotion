const subSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const SubSection = require("../models/SubSection");

exports.createSubSection = async (req, res) => {
  try {
    // fetch data from req body
    const { title, timeDuration, description, sectionId } = req.body;
    // extract file/video
    const VideoUrl = req.file.VideoUrl;
    // validation
    if (!title || !timeDuration || !description) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    // upload video to cloudinary
    const VideoUpload = await uploadImageToCloudinary(
      VideoUrl,
      process.env.FOLDER_NAME
    );

    // create sub section
    const SubSectionDetails = await subSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: VideoUpload.secure_url,
    });
    // update section with sub section objectId
    const updateSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {  
        $push: {
          subSection: SubSectionDetails._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
        success: false,
        message: "updated successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "can not fetch SubSection detail"
    });
  }
};
// update subsection
exports.updateSubSection=async (req,res)=>{
    try{
        const {subSectionId,sectionId,title,timeDuration,description}=req.body;
        if (!title || !timeDuration || !description || subSectionId) {
            return res.status(400).json({
              success: false,
              message: "all fields are required",
            });
          }

        const updateSubSection=await subSection.findByIdAndUpdate(subSectionId,{title,timeDuration,description},{new:true})

        
        return res.status(200).json({
            success: false,
            message: "updated successfully",
            description:updateSubSection,
          });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "can not update SubSection detail",
        });
}

}
// delete subsection 

exports.deleteSubSection=async (req,res)=>{
    try{
        const {subSectionId,sectionId}=req.body;
        const deleteSubsection= await SubSection.findByIdAndDelete(subSectionId)

        return res.status(200).json({
            success:true,
           message:'Sub-section deleted successfully',
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