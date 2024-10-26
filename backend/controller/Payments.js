const {instance}=require("../config/Razorpay")
const Course=require("../models/Course")
const user=require("../models/User")
const mailSender=require("../utils/mailSender")
const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail")
const {paymentSuccess}=require("../mail/templates/paymentSuccess")

exports.CapturePayment=async(req, res)=>{
    const {course_id}=req.body;
    const userId=req.user.id;
    
    
}