import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/home";
import { Maieutique } from "./Pages/maieutique";
import { Layout } from "./Layout";
import {useState, useEffect} from 'react';

function App() {
  
  const [users, setUsers] = useState(false);

  function getUser() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setUsers(data);
      });
  }

  function createUser() {
    let username = prompt('Enter username');
    let cohorte = prompt('Enter cohorte name');
    let password = prompt('Enter cohorte password');
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, cohorte, password}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUser();
      });
  }

  function deleteUser() {
    let id = prompt('Enter user id');
    fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUser();
      });
  }

  function updateUser() {
    let id = prompt('Enter user id');
    let username = prompt('Enter new username');
    let cohorte = prompt('Enter new cohorte name');
    let password = prompt('Enter new password name');
    fetch(`http://localhost:3001/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, cohorte, password}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUser();
      });
  }

  useEffect(() => {
    getUser();
  }, []);


  return (
    <Router>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/maieutique" element={<Maieutique />} />
          
        </Route>
      </Routes>
      <div>
            {users ? users : 'There is no user data available'}
            <br />
            <button onClick={createUser}>Add user</button>
            <br />
            <button onClick={deleteUser}>Delete user</button>
            <br />
            <button onClick={updateUser}>Update user</button>
        </div>
    </Router>
  );
}

export default App