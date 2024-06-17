import { Login } from "../Components/Login";
import { Logout } from "../Components/Logout";

export function LoginPage() {
  if (localStorage.getItem("user")) {
    return <Logout />;
  } else {
    return (
      <>
        <Login />
      </>
    );
  }
}
