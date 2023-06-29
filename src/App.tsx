import React, {useEffect, useState} from 'react';
import PortalAppBar from "./_portal/_appbar/PortalAppBar";
import {Outlet} from "react-router-dom";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

  return (
    <React.Fragment>
        {isLoggedIn && <PortalAppBar />}
        <Outlet />
    </React.Fragment>
  );
}

export default App;
