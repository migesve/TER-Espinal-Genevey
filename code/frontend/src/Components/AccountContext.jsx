import { createContext, useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser || { LoggedIn: null });
  //const navigate = useNavigate();
  console.log("User:", user);


  useEffect(() => {
    if (user.LoggedIn === null) {
      console.log("Fetching user data...");
      fetch("http://localhost:4000/auth/login", {
        method: "GET",
        credentials: "include",
      })
        .catch((err) => {
          console.log("Error 1:");
          setUser({ LoggedIn: false });
          localStorage.setItem("user", JSON.stringify({ LoggedIn: false }));
          return;
        })
        .then((r) => {
          if (!r || !r.ok || r.status >= 400) {
            console.log("Error 2:");
            setUser({ LoggedIn: false });
            localStorage.setItem("user", JSON.stringify({ LoggedIn: false }));
            return;
          }
          return r.json();
        })
        .then((data) => {
          if (!data) {
            console.log("Error 3:");
            setUser({ LoggedIn: false });
            localStorage.setItem("user", JSON.stringify({ LoggedIn: false }));
            return;
          }
          setUser({ ...data });
          console.log("Success:");
          localStorage.setItem("user", JSON.stringify({ ...data }));
          //navigate('/exercice');
        });
    }
  }, []);
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
