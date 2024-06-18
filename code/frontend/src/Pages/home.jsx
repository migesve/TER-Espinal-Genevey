import { Button } from "../Components/Button";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  let content = null;
  if (user && user.LoggedIn && (user.statut === "professeur" || user.statut === "Admin")) {
    content = "Bienvenue Professeur";
  } else if (user && user.LoggedIn && user.statut === "étudiant") {
    content = "Bienvenue Etudiant";
  } else {
    content = (
      <Button
        onClick={() => navigate("/login")}
        text="Login ou Créer un compte"
      />
    );
  }
  return (
    <>
      <h1>Maieutique</h1>
      <p>App pour apprendre les positions de la tête</p>
      <div className="flex mx-auto justify-center">{content}</div>
    </>
  );
}
