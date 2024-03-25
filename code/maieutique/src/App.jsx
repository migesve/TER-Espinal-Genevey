import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/home";
import { Maieutique } from "./Pages/maieutique";
import { Layout } from "./Layout";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/maieutique" element={<Maieutique />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App