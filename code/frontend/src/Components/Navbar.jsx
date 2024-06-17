import { Link } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";

export function Navbar() {
  const { user } = useContext(AccountContext);

  if (user.statut !== null && user.statut === "étudiant") {
    const navItems = [
      { id: 1, text: "Home", path: "/" },
      { id: 2, text: "Exercices", path: "/exercices" },
    ];

    return (
      <div className="inset-x-0 top-0 bg-white flex justify-between items-center h-18 mx-auto px-4 text-white z-50">
        <ul className="md:flex">
          {navItems.map((item) => (
            <Link key={item.id} to={item.path}>
              <li className="p-4 hover:bg-blue-600 rounded-md m-2 cursor-pointer duration-100 hover:text-white">
                {item.text}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
    // null
  } else if (
    user.statut &&
    (user.statut === "Professeur" || user.statut === "Admin")
  ) {
    // Professeur ou admin
    const navItems = [
      { id: 1, text: "Home", path: "/" },
      { id: 2, text: "Saisir Nouveau Set", path: "/saisieSet" },
      { id: 3, text: "Exercices", path: "/exercices" },
      { id: 4, text: "Creer Compte", path: "/creerCompte" },
      { id: 5, text: "Sets", path: "/sets" },
      { id: 6, text: "Statistiques", path: "/retours" },
      {
        id: 7,
        text: "Gestion des ustilisateurs",
        path: "/gestionUtilisateurs",
      },
      { id: 8, text: "Log Out", path: "/login" },
    ];

    return (
      //<div className="flex-no-wrap relative flex w-full items-center justify-between bg-slate py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
      //<div className="bg-white w-full sticky justify-between items-center max-w-4xl left-0 mx-auto text-white z-50 top-0">
      <div className="inset-x-0 top-0 bg-white flex justify-between items-center h-18 mx-auto px-4 text-white z-50">
        <ul className="md:flex">
          {navItems.map((item) => (
            <Link key={item.id} to={item.path}>
              <li className="p-4 hover:bg-blue-600 rounded-md m-2 cursor-pointer duration-100 hover:text-white">
                {item.text}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  } else {
    // outsider
    return (
      <div className="inset-x-0 top-0 bg-white flex justify-between items-center h-18 mx-auto px-4 text-white z-50">
        <ul className="md:flex">
          <Link to="/login">
            <li className="p-4 hover:bg-blue-600 rounded-md m-2 cursor-pointer duration-100 hover:text-white">
              Login ou créer un compte
            </li>
          </Link>
        </ul>
      </div>
    );
  }
}
