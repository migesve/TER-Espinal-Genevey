import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";

const useAdmin = () => {
    const {user} = useContext(AccountContext);
    return user && user.statut === "Admin";
}

const AdminRoutes = () => {
    const isAdmin = useAdmin();
    return isAdmin ? <Outlet /> : <Navigate to="/" />;
}
export default AdminRoutes;