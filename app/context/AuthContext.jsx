"use client"
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup,signOut,onAuthStateChanged,GoogleAuthProvider, updateCurrentUser} from 'firebase/auth'
import {auth} from '../firebase'

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const googleSignIn=()=>{
        const provider=new GoogleAuthProvider()
        signInWithPopup(auth,provider)
    }

    const logOut=()=>{
        signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })
        return()=>unSubscribe()
    },[user])

    return (
        <AuthContext.Provider value={{ user,setUser,googleSignIn,logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};