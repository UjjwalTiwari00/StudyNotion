const jwt=require("jsonwebtoken");
require("dotenv").config();

// auth
exports.auth=async(req,res,next)=>{
    try{
        const token =req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","")
        if(!token){
            return res.status(401).json({
                success: false,
                message: "token missing",
              });
        }
        try{
            // Verifying the JWT using the secret key stored in environment variables
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);
            req.user=decode;
        }
        catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}
        next();
    }catch(e){
        // If there is an error during the authentication process, return 401 Unauthorized response
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
    }
}
// isStudent
exports.isStudent=async(req,res,next)=>{
    try{
        const userDetails=await User.findOne({email:req.user.email});

        if(userDetails.accountType !== "Student"){
            return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
        }
        next();
    }
    catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
}
// isInstructor
exports.isAdmin=async(req,res,next)=>{
    try{
        const userDetails=await User.findOne({email:req.user.email});

        if(userDetails.accountType !== "Admin"){
            return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
        }
        next();
    }
    catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
}
// isAdmin
exports.isInstructor = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		console.log(userDetails);

		console.log(userDetails.accountType);

		if (userDetails.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};