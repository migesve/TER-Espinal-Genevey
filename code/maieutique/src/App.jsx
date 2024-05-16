import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Home } from "./Pages/home";

import { SaisieSet } from "./Pages/Admin/saisieSet";
import { CreerExercice } from "./Pages/Admin/creerExercice";
import { Sets } from "./Pages/Admin/sets";

import { Exercices } from "./Pages/User/exercices";
import { Exercice } from "./Pages/User/exercice";
import { RetourExercice } from "./Pages/User/retourExercice";
import { FinExercice } from "./Pages/User/finExercice";

import { CreerCompte } from "./Pages/creerCompte";
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
          <Route element={<Layout />} >
            <Route path="/creerCompte" element={<CreerCompte />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/exercices" element={<Exercices />} />
              <Route path="/exercice" element={<Exercice />} />
              <Route path="/retourExercice" element={<RetourExercice />} />
              <Route path="/finExercice" element={<FinExercice />} />

              <Route element={<ProfesseurRoutes />}>
                <Route path="/creerExercice" element={<CreerExercice />} />
                <Route path="/saisieSet" element={<SaisieSet />} />
                <Route path="/sets" element={<Sets />} />
              </Route>

              <Route element={<ProfesseurRoutes />}>
                
              </Route>
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </UserContext>
  );
}

export default App