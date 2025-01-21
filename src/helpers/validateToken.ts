import User from "@/models/userModel";
import bcrypt from "bcryptjs"

export const validateToken = async (token: string) {
    
    if(!token){
        throw new Error("Token is required");
    }

    const user = await User.findOne({
        forgotPasswordTokenExpiry: { $gt: Date.now() },
    })

    if(!user){
        throw new Error("Invalid or expired token");
    }

    const isTokenValid = await bcrypt.compare(token, user.forgotPasswordToken);
    if(!isTokenValid){
        throw new Error("Invalid or expired token");
    }
   
    return user;
     
};
