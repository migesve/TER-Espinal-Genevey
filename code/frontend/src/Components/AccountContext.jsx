import { createContext, useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser || { LoggedIn: null });
  //const navigate = useNavigate();


  useEffect(() => {
    if (user.LoggedIn === null) {
      fetch("http://localhost:4000/auth/login", {
        method: "GET",
        credentials: "include",
      })
        .catch((err) => {
          setUser({ LoggedIn: false });
          localStorage.setItem("user", JSON.stringify({ LoggedIn: false }));
          return;
        })
        .then((r) => {
          if (!r || !r.ok || r.status >= 400) {
            setUser({ LoggedIn: false });
            localStorage.setItem("user", JSON.stringify({ LoggedIn: false }));
            return;
          }
          return r.json();
        })
        .then((data) => {
          if (!data) {
            setUser({ LoggedIn: false });
            localStorage.setItem("user", JSON.stringify({ LoggedIn: false }));
            return;
          }
          setUser({ ...data });
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
