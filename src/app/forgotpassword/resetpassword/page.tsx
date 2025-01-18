"use client"
import React from "react";
import { useState, useEffect } from "react";

export default function ResetPassword(){
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
        
        <h1 className="mb-4">Forgot password</h1>
        <input
        type="password"
        placeholder="password"
        className="text-black focus:outline-none focus:bg-gray-100 p-2 border rounded-md"
        />
        <hr/>
        <input
        type="password"
        placeholder="confirm password"
        className="text-black focus:outline-none focus:bg-gray-100 p-2 border rounded-md"
        />
         <button className="mt-2 bg-blue-500 p-2 rounded-md text-sm">
         Submit password
         </button>
        </div>
    )
}