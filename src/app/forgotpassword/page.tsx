"use client"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast";



export default function ForgotPassword(){
    
    const[email, setEmail] = useState("");
    const[loading, setLoading] = useState(false);
    
    const onSubmission = async () => {
    setLoading(true);
    try{
    console.log("from frontend: ",email);
    await axios.post('/api/users/forgetpassword', {email})
    toast.success('Email sent successfully');
    }catch(error: any){
    toast.error(error.message);
    console.log("error",error.message)
    }finally{
    setLoading(false);
    }
}
return(

    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
    <h1 className="text-3xl mb-10">{loading ? "Sending an email...": "Enter your email to reset your password"}</h1>
    <input
    type="text"
    placeholder="Enter your email"
    className="focus:outline-none text-black focus:outline-blue-100 hover:bg-blue-100 duration-200 transition-all p-2 rounded-md"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    />
    <button
    onClick={onSubmission}
    disabled={loading}
    className={`p-2 mt-2 rounded-md bg-blue-500 hover:bg-blue-700 duration-200 transition-all ${loading?"opacity-50 cursor-50 cursor-not-allowed": ""}`}
    >Submit</button>
    </div>
)
}