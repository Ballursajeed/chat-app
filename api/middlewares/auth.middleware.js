import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const validateUser = async(req,res,next) => {
    
    try {
        
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

        if (!token) {
            return res.status(400).json({
                message: "Unauthorized Request!",
                status: 400,
             }) 
        }
           
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN)
      
        const user = await User.findById(decodedToken?._id).select("-password")
        
      if (!user) {
        return res.status(400).json({
            message: "Invalid Access Token",
            status: 400,
         }) 
      }
    
      req.user = user
      
      next()

    } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong !!",
            status: 500,
            errorMessage: error.message,
            error
         })
    }

}

export {validateUser}