import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/home";
import { Maieutique } from "./Pages/maieutique";
import { Exercices } from "./Pages/exercices";
import { Exercice } from "./Pages/exercice";
import { CreerCompte } from "./Pages/creerCompte";
import { Layout } from "./Layout";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/maieutique" element={<Maieutique />} />
          <Route path="/exercices" element={<Exercices />} />
          <Route path="/exercice" element={<Exercice />} />
          <Route path="/creerCompte" element={<CreerCompte />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App