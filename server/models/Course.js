const mongoose = require("mongoose");

// Define the Courses schema
const coursesSchema = new mongoose.Schema({
  courseName:{
      type:String,

  },
  courseDescription:{
      type:String,
  },
  instructor:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
  },
  whatYouWillLearn:{
      type:String,
  },
  courseContent:[
      {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Section",
      }
  ],
  ratingAndReviews:[
      {
          type:mongoose.Schema.Types.ObjectId,
          ref:"RatingAndReview",
      }
  ],
  price:{
      type:String,

  },
  thumbnail:{
      type:String,
  },
  category:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Categories"
  },
  tag:{
      type:[String]
  },
  studentsEnrolled:[
      {
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",
          required:true
      }
  ],
  instructions:{
      type:[String],

  },
  status:{
      type:String,
      enum:["Draft","Published"]
  },
  createdAt:{
      type:Date,
  }
  
});


// Export the Courses model
module.exports = mongoose.model("Course", coursesSchema);
