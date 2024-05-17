const express = require('express');
const router = express.Router();
const Yup = require('yup');
const validateFormLogin = require('../controllers/validateFormLogin');
const pool = require('../db');
const bcrypt = require('bcrypt');
const validateFormSignUp = require('../controllers/validateFormSignUp');

router
    .route("/login")
    .get(async (req, res) => {
        if(req.session.user && req.session.user.username){
            console.log(req.session.user.username);
            res.json({ LoggedIn : true, username: req.session.user.username, statut: req.session.user.statut, cohorte: req.session.user.cohorte});
        }else{
            res.json({ LoggedIn : false});
        }
    })
    .post(async (req, res) => {
        validateFormLogin(req, res);

        const potentialLogin = await pool.query(
            'SELECT id, username, passhash, statut, cohorte FROM users u WHERE u.email = $1',
            [req.body.email]
        );
        if(potentialLogin.rowCount > 0){
            const isSamePass = await bcrypt.compare(
                req.body.password, 
                potentialLogin.rows[0].passhash
            );
            if(isSamePass){
                req.session.user = {
                    username:potentialLogin.rows[0].username,
                    id:potentialLogin.rows[0].id,
                    statut:potentialLogin.rows[0].statut,
                    cohorte:potentialLogin.rows[0].cohorte
                }
                res.json({ LoggedIn : true, username: potentialLogin.rows[0].username, statut: potentialLogin.rows[0].statut, cohorte: potentialLogin.rows[0].cohorte});
            }else{
                res.json({ LoggedIn : false, status : "Email ou mot de passe incorrect !"});
            }
        }else{
            res.json({ LoggedIn : false, status : "Email ou mot de passe incorrect !"});
        }
    });

router.post('/register', async (req, res) => {
    validateFormSignUp(req, res);

    const existingUser = await pool.query(
        'SELECT username FROM users WHERE username = $1', 
        [req.body.username]
    );

    if(existingUser.rowCount == 0){
        const existingEmail = await pool.query(
            'SELECT username FROM users WHERE email = $1', 
            [req.body.email]
        );
        if(existingEmail.rowCount == 0){
            const hashedPass = await bcrypt.hash(req.body.password, 10);

            const newUserQuery = await pool.query(
                'Insert INTO users (username, passhash, email, statut, cohorte) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, statut, cohorte',
                [req.body.username, hashedPass, req.body.email, 'étudiant', req.body.cohorte]
            );
            req.session.user = {
                username:newUserQuery.rows[0].username,
                id:newUserQuery.rows[0].id,
                statut:newUserQuery.rows[0].statut,
                cohorte:newUserQuery.rows[0].cohorte
            }
            res.json({ LoggedIn : true, username: req.body.username, statut: newUserQuery.rows[0].statut, cohorte: newUserQuery.rows[0].cohorte});
        }
        else {
            res.json({ LoggedIn : false, status : "Email déjà utilisé"});
        }
        
    }
    else {
        res.json({ LoggedIn : false, status : "Nom d'utilisateur déjà utilisé"});
    }
});

module.exports = router;