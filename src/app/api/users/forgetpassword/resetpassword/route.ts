import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs"
import {validateToken} from "@/helpers/validateToken";
import {connect} from "@/dbConfig/dbConfig"

connect();

export async function POST(request: NextRequest){
try{
    const reqBody = await request.json();
    const {token, newPassword, confirmPassword} = reqBody;
    console.log(token,newPassword,confirmPassword)

    if(!token || !newPassword || !confirmPassword){
        return NextResponse.json({message: "All fields are required"}, {status: 400})
    }

    const user = await User.findOne({
        forgotPasswordToken : token,
        forgotPasswordTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }
    
    if(newPassword !== confirmPassword){
        return NextResponse.json({message: "Passwords do not match"}, {status: 400});
    }
 
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();
    

    return NextResponse.json({
        message: "Password reset successfully",
        success: true,
    }, {status:200})
}catch(error: any){
 console.error("Error resetting passsowrd: ",error.message);
return NextResponse.json(
    {message:"Failed resetting the password", error: error.message},
    {status: 500}
)
}
}