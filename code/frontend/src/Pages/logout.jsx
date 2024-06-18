import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../Components/AccountContext";
import { Button } from "../Components/Button";

export const Logout = () => {
  const { setUser } = useContext(AccountContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:4000/auth/logout", {
      method: "POST",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Logout failed");
        }
        return response.json();
      })
      .then((data) => {
        if (data.LoggedIn === false) {
          setUser(null);
          localStorage.removeItem("user");
          navigate("/home");
        } else {
          console.error("Logout failed:", data.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-5 rounded shadow">
        <h3 className="text-center text-lg font-semibold">Are you sure you want to log out?</h3>
        <div className="mt-5 flex justify-around">
          <Button onClick={handleLogout} text="Logout" />
          <Button onClick={() => navigate("/home")} text="Annuler" />
        </div>
      </div>
    </div>
  );
};
