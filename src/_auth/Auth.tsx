import React from "react";
import { Outlet } from "react-router-dom";
import AuthAppBar from "./_appbar/AuthAppBar";
const Auth = () => {
    return (
        <React.Fragment>
            <AuthAppBar />
            <Outlet />
        </React.Fragment>
    );
}
export default Auth;
