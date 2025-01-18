import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { sendEmail } from '@/helpers/mailer';
import {connect} from "@/dbConfig/dbConfig"


connect();
export async function POST(request: NextRequest){
try{
const reqBody = await request.json();
const{email} = reqBody;

if(!email){
    return NextResponse.json("Provide a valid email")
}

//Find user by this email, returns a mongoose document 
const user = await User.findOne({email})
if(!user){
    return NextResponse.json({error: "User not found"}, {status: 404});
}


const userId = user._id;
const sendNewEmail = await sendEmail({email, emailType:"RESET", userId})


if(sendNewEmail){
    return  NextResponse.json({
    message:"Password reset email sent successfully",
    success: true,
    })
}else{
    NextResponse.json({
        error:"Failed to send email",
        success: false,
    })
}

}catch(error: any){
console.log("Forgot password error",error.message)

return NextResponse.json({error: "Internal Server Error"},{status:500});
}

}