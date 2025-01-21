"use client"
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword(){
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [token, setToken] = useState("")
    const [success, setSuccess] = useState("");

  
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const queryToken = searchParams.get("token");
        if(queryToken){
            setToken(queryToken as string)
        }
    }, [searchParams]);

    const resetPassword = async () => {
        if (newPassword !== confirmPassword){
            setError("Passwords do not match");
            return;
        }
        try{
        setLoading(true);
        const response = await axios.post("/api/users/forgetpassword/resetpassword", {token, newPassword, confirmPassword})
        setSuccess(response.data.message)
        setError("");
        setTimeout(() => router.push("/login"), 3000)
        }catch(error:any){
        console.error("error reseting the password", error.message)
        setError(error.response?.data?.message || "Failed to reset the password")
        }finally{
        setLoading(false);
    }
}


    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
        
        <h1 className="mb-4">Forgot password</h1>
        <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="password"
        className="text-black focus:outline-none focus:bg-gray-100 p-2 border rounded-md"
        />
        <hr/>
        <input
        type="password"
        value={confirmPassword}
        onChange={(e) => {setConfirmPassword(e.target.value)}}
        placeholder="confirm password"
        className="text-black focus:outline-none focus:bg-gray-100 p-2 border rounded-md"
        />
       {error && <div className="text-red-500">{error}</div>}
       {success && <div>{success}</div>}
         <button 
         className="mt-2 bg-blue-500 p-2 rounded-md text-sm"
         onClick={resetPassword}
         disabled = {loading}
         >
         {loading ? "Resetting Password..." : "Submit password"}
         </button>
        </div>
    )
}