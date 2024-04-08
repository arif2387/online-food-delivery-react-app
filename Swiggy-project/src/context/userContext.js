import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@firebase/auth';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            setUser(authUser);
        });

        return () => unsubscribe();
    }, []);

    const Login = async () =>{

    }
    const Logout = async () => {
        signOut(auth).then(() => {
            navigate('/auth')
        })
    };

    const value = {
        user,
        Login,
        Logout,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
