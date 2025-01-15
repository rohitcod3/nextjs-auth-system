"use client"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import { NextResponse } from "next/server"
import {toast} from "react-hot-toast"
import {useRouter} from "next/navigation"


export default function ProfilePage(){
    const router = useRouter();
    const [data, setData] = useState('nothing')
    const logout = async () =>{
        try{
            const response = await axios.get("/api/users/logout")
             toast.success('Logout successful')
            router.push('/login')
        }catch(error: any){
            console.log(error.message);
            toast.error(error.message);
        }
    
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr/>
        <p>Profile page</p>
        <h2 className="p-3 rounded bg-green-500">{data ==='nothing' ? 'Nothing' : <Link
        href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr/>
        <button className="bg-blue-500 mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>

        <button className="bg-green-500 mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getUserDetails}>GetUser Details</button>
        </div>
    )
}