import User from "../models/User.js";


export const getUserData = async (req,res)=>{
    try {
        const userId =  req.user.id

        console.log(userId);
        
        const user = await User.findById(userId).select("-password -otp -otpExpires");

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        return res.json({message:"User data fetch successfully",userData:{
            name:user.name,
            email:user.email,
            emailVerified :user.isVerified,
            createdAt : user.createdAt
            
        }})
    } catch (error) {
        return res.json({messgae:error.message}).status(500);
        
    }
}


