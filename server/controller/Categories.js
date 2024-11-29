const Category = require('../models/Category');

const course=require('../models/Course');

exports.createCategories=async (req,res)=>{
    try{
        // fetch data
        const{name,description}=req.body;
        // validate
        if(!name || !description ){
            return res.status(400).json({
                success:false,
                message:'all fields are required',
            })
        }
        // save the data
        const categoryDetail=await Category.create({
            name:name,
            description:description
        })
        // return response
        return res.status(200).json({
            success:true,
            message:'Category created successfully',
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            message: e.message
        })
    }
}
exports.getAllCategories = async (req, res) => {
    try {
        // Fetch all categories, only name and description fields
        const CategoryDetails = await Category.find({}, { name: true, description: true });

        // Return the response
        return res.status(200).json({
            message: "Categories fetched successfully",
            success: true,
            CategoryDetails,
        });
    } catch (e) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: e.message, // Optional: Include error message for debugging
        });
    }
};

