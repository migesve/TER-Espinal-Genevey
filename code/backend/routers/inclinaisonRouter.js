const express = require('express');
const router = express.Router();
const Yup = require('yup');
const pool = require('../db');

router
    .route("/getAll")
    .get(async (req, res) => {

        const listeInclinaisons = await pool.query(
            'SELECT * FROM inclinaison',
            []
        );
        console.log(listeInclinaisons.rows);

        if(listeInclinaisons.rowCount > 0){
            res.json({ Succes : true, inclinaisons: listeInclinaisons.rows});
        }else{
            res.json({ Succes : false, status : "La liste des inclinaisons n'a pas pu être récupérée !"});
        }
    });

router
    .route("/getById")
    .get(async (req, res) => {

        const listeInclinaisons = await pool.query(
            'SELECT * FROM inclinaison WHERE inclinaison_id = $1',
            [req.body.inclinaison_id]
        );
        console.log(listeInclinaisons.rows);

        if(listeInclinaisons.rowCount > 0){
            res.json({ Succes : true, Inclinaisons : listeInclinaisons.rows});
        }else{
            res.json({ Succes : false, status : "La liste des inclinaisons n'a pas pu être récupérée !"});
        }
    });


router.post('/upload', async (req, res) => {
    validateFormInclinaison(req, res);

    const existingInclinaison = await pool.query(
        'SELECT inclinaison_id FROM inclinaison WHERE label = $1 OR degres_min = $2 OR degres_max = $3', 
        [req.body.inclinaison_id, req.body.degres_min, req.body.degres_max]
    );

    if(existingInclinaison.rowCount == 0){
        const newInclinaisonQuery = await pool.query(
            'Insert INTO inclinaison (label, degres_min, degres_max) VALUES ($1, $2, $3) RETURNING *',
            [req.body.label, req.body.degres_min, degres_max]
        );
        res.json({ Succes : true, inclinaison_id : newInclinaisonQuery.rows[0].inclinaison_id, label : newInclinaisonQuery.rows[0].label, degres_min : newInclinaisonQuery.rows[0].degres_min, degres_max : newInclinaisonQuery.rows[0].degres_max});
    }
    else {
        res.json({ Succes : false, status : "L'inclinaison existe déjà !"});
    }
});

module.exports = router;