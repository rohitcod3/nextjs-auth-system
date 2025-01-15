"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const[user, setUser] = React.useState({
        email:"",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const[loading, setLoading] = React.useState(false);

    const onLogin = async() => {
    try{
    setLoading(true);
    //Note for self: we store this response in a response constant where since the backend sends a "successfull login" message or "response" back if the login is successfull or if it is unsuccessfull and we can thus console log this value in order to see the response
    const response = await axios.post('/api/users/login', user);
    console.log("Login success", response.data);
    toast.success('Login success');
    router.push("/profile");
    }catch(error:any){
    toast.error(error.message)
    console.log('Login failed', error.message)
    }finally{
    setLoading(false);
    }
    } 
    
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length >0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user])


    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-7 text- font-fold">Login</h1>
            <hr/>
            {/* if loading value is true, it is set to processing otherwise Login */}
            <label htmlFor="email">{loading ? "Processing":"Login"}</label>
            <input
            className="p-2 border-gray-300 rounded-lg focus:outline-none focus:outline-gray-400 text-black"
            id="email"
            type='text'
            value={user.email}
            onChange={(e) => setUser({...user, email:e.target.value})}
            placeholder="email"
            />

            < label htmlFor="password">Password</label>
            <input
            className="p-2 border-gray-300 rounded-lg focus:outline-none focus:outline-gray-400 text-black"
            id="password"
            type='password'
            value={user.password}
            onChange={(e) => setUser({...user, password:e.target.value})}
            placeholder="password"
            />

            <button 
            onClick={onLogin}
            className="p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 mt-4"
            >{buttonDisabled ? "No login" : "Login"}</button>
            <Link href="/signup">Visit Signup page</Link>
        </div>
        
    )
}