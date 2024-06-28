import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Home } from "./Pages/home";

import { SaisieImage } from "./Pages/Admin/saisieImage";
import { Sets } from "./Pages/Admin/sets";

import { Exercices } from "./Pages/User/exercices";
import { Exercice } from "./Pages/User/exercice";
import { FinExercice } from "./Pages/User/finExercice";
import { RetoursEnseignant } from "./Pages/Admin/retoursEnseignant";
import { Gestion } from "./Pages/Admin/gestionUtilisateurs";

import { CreerCompte } from "./Pages/creerCompte";
import { LoginPage } from "./Pages/login";
import { Logout } from "./Pages/logout";
import { Layout } from "./Layout";
import PrivateRoutes from "./Components/PrivateRoutes";
import ProfesseurRoutes from "./Components/ProfesseurRoutes";
import AdminRoutes from "./Components/AdminRoutes";
import UserContext from "./Components/AccountContext";

function App() {
  return (
    <UserContext>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/creerCompte" element={<CreerCompte />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/exercices" element={<Exercices />} />
              <Route path="/exercice" element={<Exercice />} />
              <Route path="/finExercice" element={<FinExercice />} />

              <Route element={<ProfesseurRoutes />}>
                <Route path="/saisieImage" element={<SaisieImage />} />
                <Route path="/sets" element={<Sets />} />
                <Route path="/retours" element={<RetoursEnseignant />} />
                <Route path="/gestionUtilisateurs" element={<Gestion />} />
              </Route>

              <Route element={<AdminRoutes />}></Route>
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </UserContext>
  );
}

export default App;
