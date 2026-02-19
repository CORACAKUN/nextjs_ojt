"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const inputStyle = "border-b h-10 w-60";

    function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        if( !name || !email || !password || !confirmPassword){
            setError("All fields are requred!");
            setSuccess(false);

            return;
        }

        if(password !== confirmPassword){
            setError("Password does not mathc!");
            setSuccess(false);

            return;
        }

        setError("");
        setSuccess(true);
        console.log("namee " + name, "email: "+email, "password: "+password);
    }

    return (
        <form action=""
        onSubmit={handleSubmit}
        className="flex flex-col p-8 items-center gap-4 shadow-2xl rounded-lg" >
            <h2 className="">Register</h2>
            
            <input 
            type="text" 
            placeholder="Full Name" 
            value={name}
            className={inputStyle}
            onChange={(e)=> setName(e.target.value)}/>

            <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e)=> setEmail(e.target.value)} 
            className={inputStyle}/>

            <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)} 
            className={inputStyle}/>

            <input 
            type="text" 
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)}
            className={inputStyle}/>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">Registration successful!</p>}

            <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded">
                Register
            </button>

            <Link 
            className="text-blue-500 hover:underline" 
            href="../login">Have an account? Login</Link>
        </form>
    );
}