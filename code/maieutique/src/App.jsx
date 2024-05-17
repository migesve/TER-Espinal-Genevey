import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

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
import UserContext from "./Components/AccountContext";


function App() {
  
  return (
    <UserContext>
      <Router>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Home />} />
            <Route path="/creerCompte" element={<CreerCompte />} />
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/maieutique" element={<Maieutique />} />
              <Route path="/exercices" element={<Exercices />} />
              <Route path="/exercice" element={<Exercice />} />
          <Route path="/retourExercice" element={<RetourExercice />} />
          <Route path="/finExercice" element={<FinExercice />} />

            </Route>
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </UserContext>
  );
}

export default App