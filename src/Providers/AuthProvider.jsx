import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateCurrentUser } from "firebase/auth";
import { useState } from "react";
import { createContext } from "react";
import auth from "../firebase/firebase.config";
import { useEffect } from "react";

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser = (email, password)=>{
        setLoading(true)
      return  createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) =>{
        setLoading(true)
     return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = ()=>{
        setLoading(true)
        return signOut(auth);
    }

    useEffect(()=>{
       const unsubsCribe = onAuthStateChanged(auth, currentUser =>{
            console.log('usr in the auth stae change');
            setUser(currentUser);
            setLoading(false)
        });
        return ()=>{
            unsubsCribe();
        }
    }, [])

    const authInfo ={
        user,
        loading,
        createUser,
        signIn,
        logOut

    }



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;