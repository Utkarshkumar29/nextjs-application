'use client'
import { UserAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
    const { user,setUser, googleSignIn, logOut } = UserAuth();
    const [loading, setLoading] = useState(true);

    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignOut = async () => {
        try {
            await logOut();
            setUser('')
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 50));
                setLoading(false);
            } catch (error) {
                console.log("Error:",error)
            }
        };
        checkAuthentication();
    }, [user]);

    return (
        <div className="flex items-center justify-between h-16 p-4 text-white">
            <ul className="flex space-x-4">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
            
                {!user ? null : (
                    <li className="cursor-pointer">
                        <Link href="/profile">Profile</Link>
                    </li>
                )}
            </ul>

            {loading ? null : !user ? (
                <ul className="flex space-x-4">
                    <li className="cursor-pointer" onClick={handleSignIn}>Login</li>
                    <li className="cursor-pointer" onClick={handleSignIn}>Sign Up</li>
                </ul>
            ) : (
                <div className="text-right">
                    <p>Welcome {user.displayName}</p>
                    <p className="cursor-pointer" onClick={handleSignOut}>Sign Out</p>
                </div>
            )}
        </div>
    )
}

export default Navbar;
