// Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";

export function Navbar() {
  const { user } = useContext(AccountContext);

  let navItems = [];
  if (user && user.statut !== null && user.statut === "étudiant") {
    navItems = [
      { id: 1, text: "Home", path: "/" },
      { id: 2, text: "Exercices", path: "/exercices" },
      { id: 3, text: "Logout", path: "/logout" },
    ];
  } else if (user && user.statut && (user.statut === "Professeur" || user.statut === "Admin")) {
    navItems = [
      { id: 1, text: "Home", path: "/" },
      { id: 2, text: "Saisir Nouveau Set", path: "/saisieSet" },
      { id: 3, text: "Exercices", path: "/exercices" },
      { id: 5, text: "Sets", path: "/sets" },
      { id: 6, text: "Statistiques", path: "/retours" },
      { id: 7, text: "Gestion des utilisateurs", path: "/gestionUtilisateurs" },
      { id: 8, text: "Logout", path: "/logout" },
    ];
  } else {
    navItems = [
      { id: 1, text: "Home", path: "/" },
      { id: 2, text: "Login", path: "/login" },
      { id: 3, text: "Créer compte", path: "/creerCompte" },
    ];
  }

  return (
    <header className="w-full bg-white shadow fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold">Maïeutique</Link>
            </div>
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link key={item.id} to={item.path}>
                  <li className="list-none p-4 hover:bg-blue-600 rounded-md m-2 cursor-pointer duration-100 hover:text-white">
                    {item.text}
                  </li>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
