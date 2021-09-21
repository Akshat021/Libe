import React, {useContext, useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import {getAuth ,onAuthStateChanged} from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
            console.log(user);
            setLoading(false);
            if(user) history.push('/chats');
        })
    }, [user , history]);

    const value = {user};

    return(
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}