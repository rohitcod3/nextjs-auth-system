import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        if (!token) {
            return NextResponse.json({ message: "Token is required" }, { status: 400 });
        }

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry : {$gt: Date.now()},
        })

        if(!user){
            return NextResponse.json({
                message: "Invaliad or expired Token"
            }, {status: 400})
        }
        

        return NextResponse.json({
            message: "Token is valid",
            success: true,
        }, { status: 200 });
        
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Failed validating the token" },
            { status: 400 }
        );
    }
}
