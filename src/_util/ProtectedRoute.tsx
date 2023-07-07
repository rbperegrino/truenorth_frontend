import React, {useCallback, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = (props: {children: React.ReactNode}) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = useCallback(() => {
        const userToken = localStorage.getItem('access-token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/auth/login');
        }
        setIsLoggedIn(true);
    }, [navigate])
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn, checkUserToken]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;
