const mongoose = require("mongoose");

// Define the RatingAndReview schema
const TagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Course",
  },
});

module.exports = mongoose.model("Tags", TagsSchema);
