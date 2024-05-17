import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";

const useProf = () => {
    const {user} = useContext(AccountContext);
    return user && (user.statut === "Professeur" || user.statut === "Admin");
}

const ProfesseurRoutes = () => {
    const isProf = useProf();
    return isProf ? <Outlet /> : <Navigate to="/" />;
}
export default ProfesseurRoutes;