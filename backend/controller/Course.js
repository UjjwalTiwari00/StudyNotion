// course create

const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const User = require("../models/User");
const tags = require("../models/tags");

exports.CreateCourse = async (req, res) => {
  try {
    // get courses
    const { courseName, courseDescription, whatyouWillLearn, price, tag } =
      req.body;
    // get thumbmnail
    const thumbnail = req.file.thumbnailImage;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatyouWillLearn ||
      !price ||
      !tag
    ) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    // check for instructor, K DB CALL MARNA AHI INSTRUCTOR KE detail ke liye

    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "instructor details not found",
      });
    }
    const tagDetails = await Course.findById(tags);

    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: "tag not found",
      });
    }
    // upload mage to couldinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // create and entry for new course

    const NewCourse = await Course.create({
      courseName,
      courseDescription,
      // yaha pe instructor detail inkalna hai but db me id pass hai to ham wapas instructor ki id instructor se fect kremge
      instructor: instructorDetails._id,
      whatyouWillLearn: whatyouWillLearn,
      price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // user update kena ahi matlab instructor ke palylist ko update krna ahi
    // add the new course to the userSchema of instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: NewCourse._id,
        },
      },
      {
        new: true,
      }
    );
    // upadte the Tag ka Schema
    // await tags.findByIdAndUpdate(
    //    {tag:tagDetails._id},
    //    {new:true}
    // )
    // TODO:

    return res.status(200).json({
      success: true,
      message: "course created successfully",
      data: NewCourse,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

//  get all courses

exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews:true,
        studentsEnrolled: true,
        
      }
    ).populate("instructor")
    .exec();


    return res.status(200).json({
      success: true,
      message: "successfully etched data",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "connot fetch course data",
    });
  }
};
