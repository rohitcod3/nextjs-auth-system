"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import {axios} from "axios";

export default function SignUp() {
    const[user, setUser] = React.useState({
        email:"",
        password: "",
        username:"",
    })

    const onSignup = async() => {

    } 
    


    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-7 text- font-fold">Signup</h1>
            <hr/>
            <label htmlFor="username">Username</label>
            <input
            className="p-2 border-gray-300 rounded-lg focus:outline-none focus:outline-gray-400"
            id="username"
            type='text'
            value={user.username}
            onChange={(e) => setUser({...user, username:e.target.value})}
            placeholder="username"
            />
            
            <label htmlFor="email">Email</label>
            <input
            className="p-2 border-gray-300 rounded-lg focus:outline-none focus:outline-gray-400"
            id="email"
            type='text'
            value={user.email}
            onChange={(e) => setUser({...user, email:e.target.value})}
            placeholder="email"
            />

            < label htmlFor="password">Password</label>
            <input
            className="p-2 border-gray-300 rounded-lg focus:outline-none focus:outline-gray-400"
            id="password"
            type='password'
            value={user.password}
            onChange={(e) => setUser({...user, password:e.target.value})}
            placeholder="password"
            />

            <button 
            onClick={onSignup}
            className="p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 mt-4"
            >Signup</button>
            <Link href="/login">Visit login page</Link>
        </div>
        
    )
}