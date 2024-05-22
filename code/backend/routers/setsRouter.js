const express = require('express');
const router = express.Router();
const Yup = require('yup');
const pool = require('../db');

router
    .route("/getAll")
    .get(async (req, res) => {

        const listeSets = await pool.query(
            'SELECT * FROM sets',
            []
        );
        console.log(listeSets.rows);

        if (listeSets.rowCount > 0) {
            return res.json({ Succes: true, sets: listeSets.rows });
        } else {
            return res.json({ Succes: false, status: "La liste des sets n'a pas pu être récupérée !" });
        }
    });

router.post('/upload', async (req, res) => {
    try {
        await validateFormSet(req, res);

        const existingSet = await pool.query(
            'SELECT position_id FROM sets WHERE nom = $1 OR abreviation = $2 OR angle1 = $3 OR angle2 = $4',
            [req.body.nom, req.body.abreviation, req.body.angle1, req.body.angle2]
        );

        if (existingSet.rowCount == 0) {
            const newSetQuery = await pool.query(
                'Insert INTO sets (nom, abreviation, descriptif, angle1, angle2, schema1_tete, schema1_bassin, schema1_fontanelle) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING position_id, nom, abreviation, descriptif, angle1, angle2, schema1_tete, schema1_bassin, schema1_fontanelle',
                [req.body.nom, req.body.abreviation, req.body.descriptif, req.body.angle1, req.body.angle2, 'src/images/schema1/tete.png', 'src/images/schema1/bassin.png', 'src/images/schema1/fontanelle.png']
            );//modifier les paths pour les colonnes schéma1

            return res.json({ Succes: true, position_id: newSetQuery.rows[0].position_id, nom: newSetQuery.rows[0].nom, abreviation: newSetQuery.rows[0].abreviation, descriptif: newSetQuery.rows[0].descriptif, angle1: newSetQuery.rows[0].angle1, angle2: newSetQuery.rows[0].angle2, schema1_tete: newSetQuery.rows[0].schema1_tete, schema1_bassin: newSetQuery.rows[0].schema1_bassin, schema1_fontanelle: newSetQuery.rows[0].schema1_fontanelle });
        }
        else {
            return res.json({ Succes: false, status: "Le set existe déjà !" });
        }
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;