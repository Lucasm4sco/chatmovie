import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
    const { user, loading } = useSelector(state => state.auth);

    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if (user)
            setAuth(true);
        else
            setAuth(false);


    }, [user]);

    return { auth, loading };
}