import { Button } from "../Components/Button";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  let content = null;
  if (
    user &&
    user.LoggedIn &&
    (user.statut === "professeur" || user.statut === "Admin")
  ) {
    content = "Bienvenue Professeur";
  } else if (user && user.LoggedIn && user.statut === "étudiant") {
    content = (
      <div className="p-4 text-left">
        <h1 className="text-2xl font-bold mb-4">Bienvenu(e)</h1>
        <p className="mb-4">
          Ici, vous pourrez pratiquer les différentes positions et
          représentations de la tête du bébé avec leurs noms et sigles
          correspondants.
        </p>
        <p className="mb-4">
          Vous pouvez choisir entre un exercice facile, avec 5 représentations
          et 4 à répondre à chaque fois, et un exercice difficile, avec 3
          représentations et 2 à répondre à chaque fois.
        </p>
        <p className="mb-4">
          Pour chaque question et dans chaque représentation à répondre,
          l'énoncé sera affiché en premier et le bouton correspondant sera
          coloré en jaune. Les autres représentations à remplir seront en bleu.
        </p>
        <ul className="list-disc pl-5">
          <li className="mb-4">
            <b>Pour les noms et les sigles</b>, il faut simplement écrire ce que
            vous pensez correspondre avec l'énoncé donné.
          </li>
          <li className="mb-4">
            <b>Pour les représentations 2 et 3</b>, il faut tourner la tête avec
            l'aide du point rouge et la placer dans la position que vous pensez
            convenir.
          </li>
          <li className="mb-4">
            <b>Pour le schéma en vue antérieure</b>, vous devez tourner, avec
            l'aide des flèches, le fœtus à la rotation qui paraît la plus proche
            de l'énoncé, et aussi incliner la tête de la manière qui vous semble
            correspondre le mieux à l'énoncé donné.
          </li>
        </ul>
        <p className="mb-4">
          Les réponses sont automatiquement sauvegardées à chaque fois que vous
          les modifiez, il n'est donc pas nécessaire de sauvegarder
          manuellement, sauf lorsque vous cliquez sur "finir question" à la fin
          de chaque question.
        </p>
      </div>
    );
  } else {
    content = (
      <div className="flex space-x-4 text-left">
        <Button onClick={() => navigate("/login")} text="Login" />
        <Button
          onClick={() => navigate("/creerCompte")}
          text="Créer un compte"
        />
      </div>
    );
  }
  return (
    <>
      <h1>Maieutique</h1>
      <h2>App pour apprendre les positions de la tête</h2>
      <div className="flex mx-auto p-4 justify-center">{content}</div>
    </>
  );
}
