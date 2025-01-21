"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ValidateToken(){
    const [token, setToken] = useState("");
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true);
    
    const router = useRouter();
    const tokenValidation = async () =>{
        try{
        setLoading(true)
        await axios.post("/api/users/forgetpassword/validate", {token})
        setError(false)
        router.push(`/forgotpassword/resetpassword?token=${token}`)
        }catch(error: any){
            setError(true)
            console.log(error.message)
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        const urlToken  = window.location.search.split('=')[1]
        setToken(urlToken || '')
    }, [])

    useEffect(() => {
        if(token.length > 0){
        tokenValidation();
        }
    }, [token])

    return(
       <div className="flex flex-col justify-center items-center min-h-screen gap-4">
       {loading && <h1 className="text-xl">Validating token ...</h1>}
       {error && (
        <div className="flex flex-col justify-center gap-2 items-center">
        <h1>Token is invalid or expired</h1>
        <button
            className="mt-4 p-2 bg-blue-500 text-white rounded-md"
            onClick={() => router.push("/forgotpassword")}
        >
            Resend Reset Link
        </button>
    </div>
       )}
       </div>
        
    )
}