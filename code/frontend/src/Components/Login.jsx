import { Input } from "./Input";
import { FormProvider, useForm } from "react-hook-form";
import { GrLogin } from "react-icons/gr";
import {
  email_validation,
  password_validation,
} from "../utils/inputValidations";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { Button } from "./Button";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "./AccountContext";

export const Login = () => {
  const [error, setError] = useState(null);
  const { setUser } = useContext(AccountContext);
  const navigate = useNavigate();
  const methods = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = methods.handleSubmit((data) => {
    methods.reset();
    fetch("http://localhost:4000/auth/login", {
      method: "POST",
      credentials: "include", // to allow cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .catch((error) => {
        console.error("Error:", error);
        localStorage.setItem("user", JSON.stringify({ LoggedIn: false }));
        return;
      })
      .then((response) => {
        if (!response || !response.ok || response.status >= 400) {
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (!data) {
          localStorage.setItem("user", JSON.stringify({ LoggedIn: false }));
          return;
        }
        setUser({ ...data });
        localStorage.setItem("user", JSON.stringify({ ...data }));
        if (data.status) {
          setError(data.status);
        } else if (data.LoggedIn) {
          setSuccess(true);
          navigate("/home");
        }
      });
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => e.preventDefault()}
        noValidate
        autoComplete="off"
        className="container w-96 m-auto my-10"
      >
        <h1>Login</h1>
        <p className="text-red-500">{error}</p>
        <div className="grid gap-5">
          <Input {...email_validation} />
          <Input {...password_validation} />
        </div>
        <div className="mt-5">
          {success && (
            <p className="font-semibold text-green-500 mb-5 flex items-center gap-1">
              <BsFillCheckSquareFill />
              Conexion Réussie
            </p>
          )}
          <Button onClick={onSubmit} text="Login" icon={GrLogin} />
          <Button
            onClick={() => navigate("/creerCompte")}
            text="Créer un compte"
          />
        </div>
      </form>
    </FormProvider>
  );
};
