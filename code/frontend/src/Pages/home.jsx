import { Button } from "../Components/Button";
import { useNavigate } from "react-router-dom";

export function Home() {
  
  const navigate = useNavigate();
  return (
    <>
      <h1>Maieutique</h1>
      <p>App pour apprendre les positions de la tête</p>
      <div className="flex mx-auto justify-center">
        <Button
          onClick={() => navigate("/login")}
          text="Login ou Créer un compte"
        />
      </div>
    </>
  );
}
