import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";

const useAuth = () => {
    const {user} = useContext(AccountContext);
    return user && user.LoggedIn;
}

const PrivateRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/" />;
}
export default PrivateRoutes;
