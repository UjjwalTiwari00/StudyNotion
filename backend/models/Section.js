const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
    sectionName:{
        type:String,
    },
    sunSection:[
      {type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",}
    ]
});

module.exports = mongoose.model("Section", SectionSchema);
