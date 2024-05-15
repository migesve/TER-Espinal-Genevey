import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./Pages/home";

import { SaisieSet } from "./Pages/Admin/saisieSet";
import { CreerExercice } from "./Pages/Admin/creerExercice";

import { Exercices } from "./Pages/User/exercices";
import { Exercice } from "./Pages/User/exercice";

import { CreerCompte } from "./Pages/creerCompte";
import { Layout } from "./Layout";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          
          <Route path="/saisieSet" element={<SaisieSet />} />
          <Route path="/creerExercice" element={<CreerExercice />} />

          <Route path="/exercices" element={<Exercices />} />
          <Route path="/exercice" element={<Exercice />} />

          <Route path="/creerCompte" element={<CreerCompte />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App