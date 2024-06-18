const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validateFormLogin = require("../controllers/validateFormLogin");
const validateFormSignUp = require("../controllers/validateFormSignUp");

router
  .route("/login")
  .get(async (req, res) => {
    if (req.session.user && req.session.user.username) {
      console.log(req.session.user.username);
      res.json({
        LoggedIn: true,
        username: req.session.user.username,
        statut: req.session.user.statut,
        cohorte: req.session.user.cohorte,
        id: req.session.user.id,
      });
    } else {
      res.json({ LoggedIn: false });
    }
  })
  .post(async (req, res) => {
    try {
      await validateFormLogin(req, res);

      const potentialLogin = await pool.query(
        "SELECT id, username, passhash, statut, cohorte FROM users u WHERE u.email = $1",
        [req.body.email]
      );

      if (potentialLogin.rowCount > 0) {
        const isSamePass = await bcrypt.compare(
          req.body.password,
          potentialLogin.rows[0].passhash
        );

        if (isSamePass) {
          req.session.user = {
            username: potentialLogin.rows[0].username,
            id: potentialLogin.rows[0].id,
            statut: potentialLogin.rows[0].statut,
            cohorte: potentialLogin.rows[0].cohorte,
          };
          return res.json({
            LoggedIn: true,
            username: potentialLogin.rows[0].username,
            statut: potentialLogin.rows[0].statut,
            cohorte: potentialLogin.rows[0].cohorte,
            id: potentialLogin.rows[0].id,
          });
        } else {
          return res.json({
            LoggedIn: false,
            status: "Email ou mot de passe incorrect !",
          });
        }
      } else {
        return res.json({
          LoggedIn: false,
          status: "Email ou mot de passe incorrect !",
        });
      }
    } catch (err) {
      console.error(err);
    }
  });

router.post("/register", async (req, res) => {
  try {
    await validateFormSignUp(req, res);

    const existingUser = await pool.query(
      "SELECT username FROM users WHERE username = $1",
      [req.body.username]
    );

    if (existingUser.rowCount === 0) {
      const existingEmail = await pool.query(
        "SELECT username FROM users WHERE email = $1",
        [req.body.email]
      );

      if (existingEmail.rowCount === 0) {
        const hashedPass = await bcrypt.hash(req.body.password, 10);

        const newUserQuery = await pool.query(
          "INSERT INTO users (username, passhash, email, statut, cohorte) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, statut, cohorte",
          [
            req.body.username,
            hashedPass,
            req.body.email,
            "étudiant",
            req.body.cohorte,
          ]
        );

        req.session.user = {
          username: newUserQuery.rows[0].username,
          id: newUserQuery.rows[0].id,
          statut: newUserQuery.rows[0].statut,
          cohorte: newUserQuery.rows[0].cohorte,
        };
        return res.json({
          LoggedIn: true,
          username: req.body.username,
          statut: newUserQuery.rows[0].statut,
          cohorte: newUserQuery.rows[0].cohorte,
          id: newUserQuery.rows[0].id,
        });
      } else {
        return res.json({ LoggedIn: false, status: "Email déjà utilisé" });
      }
    } else {
      return res.json({
        LoggedIn: false,
        status: "Nom d'utilisateur déjà utilisé",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

router.route("/getNoms").get(async (req, res) => {
  const listeUsers = await pool.query(
    "SELECT username, statut FROM users ORDER BY username ASC"
  );
  if (listeUsers.rowCount > 0) {
    return res.json({ Succes: true, users: listeUsers.rows });
  } else {
    return res.json({ Succes: false, status: "Aucun utilisateur" });
  }
});

router.route("/changerStatut").put(async (req, res) => {
  const { username, statut } = req.body;

  // Validation des entrées
  if (!username || !statut) {
    return res
      .status(400)
      .json({ success: false, status: "Paramètres manquants" });
  }

  // Mise à jour du statut dans la base de données
  const updateStatut = await pool.query(
    "UPDATE users SET statut = $1 WHERE username = $2 RETURNING username, statut",
    [statut, username]
  );

  if (updateStatut.rowCount > 0) {
    return res
      .status(200)
      .json({
        success: true,
        status: "Statut modifié",
        user: updateStatut.rows[0],
      });
  } else {
    return res
      .status(404)
      .json({ success: false, status: "Utilisateur non trouvé" });
  }
});

router.post('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ LoggedIn: false, status: 'Logout failed' });
            }
            res.clearCookie('sid'); // 
            return res.json({ LoggedIn: false, status: 'Logged out successfully' });
        });
    } else {
        return res.status(400).json({ LoggedIn: false, status: 'No active session' });
    }
});


module.exports = router;
