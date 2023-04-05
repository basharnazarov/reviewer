import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import { useAuth } from "../auth/auth";

const RequireAuth = () => {
    const isAuth = useAuth();
    return isAuth.user ? <Outlet /> : <Login />;
};

export default RequireAuth;
