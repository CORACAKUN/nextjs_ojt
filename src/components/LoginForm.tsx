"use client";

import { useState } from "react";

export default function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        if(!email || !password){
            setError("Email and password are required!");
            setSuccess(false);
            return;
        }

        setError("");
        setSuccess(true);

    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col p-8 items-center gap-4 shadow-2xl rounded-lg">
            <h2 className="text-xl">Login</h2>
            
            <input type="email" placeholder="Email" 
            value={email} onChange={(e) => setEmail(e.target.value)} 
            className="border-b h-10 w-60" />

            <input type="password" placeholder="Password" 
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="border-b h-10 w-60" />

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Login
            </button>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Login successful!</p>}
        </form>
    );
} 