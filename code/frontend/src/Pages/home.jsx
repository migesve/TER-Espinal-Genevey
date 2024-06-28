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
        <h1 className="text-2xl font-bold mb-4 text-[#646cff]">Bienvenu(e)</h1>
        <p className="mb-4">
          Ici, vous pourrez manipuler les différentes positions et
          représentations de la tête du foetus avec leurs noms et sigles
          correspondants.
        </p>
        <p className="mb-4">
          Vous aurez le choix entre deux niveaux de difficulté :
        </p>
        <p>
          - <b>Facile</b> : 5 représentations à faire correspondre ; l’une est donnée
          et vous devrez choisir les 4 autres
        </p>
        <p className="mb-4">
          - <b>Difficile</b> : 3 représentations à faire correspondre ; l’une est
          donnée et vous devrez choisir les 2 autres
        </p>
        <p className="mb-4">Chaque exercice comporte 5 questions à traiter.</p>
        <p className="mb-4">
          Pour chaque question la représentation donnée (l'énoncé) sera affichée
          en premier, et le bouton correspondant sera coloré en jaune. Les
          autres représentations, que vous devrez sélectionner et compléter,
          sont colorées en bleu.
        </p>
        <p className="mb-4">Les représentations sont : </p>
        <ul className="list-disc pl-5">
          <li className="mb-4">
            <b>« Nom complet » </b> de la présentation : écrivez dans l’espace
            prévu ce vous pensez correspondre avec l'énoncé donné (exemple :
            occipito-pubien).
          </li>
          <li className="mb-4">
            <b>« Sigle » </b> : écrivez dans l’espace prévu le sigle
            correspondant (exemple : OP)
          </li>
          <li className="mb-4">
            Les représentations <b>« Partogramme »</b> et{" "}
            <b>« Schéma simplifié » </b>: tournez la tête fœtale à l'aide du
            point rouge et placez-là dans la position souhaitée ; ajustez la
            flexion à l’aide du curseur vertical
          </li>
          <li className="mb-4">
            <b>« Schéma vue antérieure » et « Schéma vue transversale »</b> :
            utilisez les flèches pour choisir la position du fœtus la plus
            proche de l'énoncé, et pour choisir la flexion de la tête
          </li>
        </ul>
        <p className="mb-4">
          Les réponses sont automatiquement sauvegardées à chaque fois que vous
          les modifiez, il n'est donc pas nécessaire de sauvegarder
          manuellement. Lorsque vous avez terminé vos choix, cliquez sur "Finir
          question".
        </p>
        <p className="mb-4">
          Vous obtiendrez alors un comparatif de vos choix et des
          représentations correctes (en vert, les correspondances correctes, en
          rouge, les correspondances erronées). Une fois le correctif obtenu…
          Recommencez avec une autre variété de présentation !
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
      <h1 className="text-[#646cff] font-bold">FoetAppView</h1>
      <h2>Une application pour manipuler les variétés de présentation</h2>
      <div className="flex mx-auto p-4 justify-center">{content}</div>
    </>
  );
}
