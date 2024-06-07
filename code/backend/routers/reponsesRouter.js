const express = require('express');
const router = express.Router();
const Yup = require('yup');
const pool = require('../db');

router
    .route("/getAll")
    .get(async (req, res) => {

        const listeReponses = await pool.query(
            'SELECT * FROM reponses',
            []
        );

        if (listeReponses.rowCount > 0) {
            return res.json({ Succes: true, reponses: listeReponses.rows });
        } else {
            return res.json({ Succes: false, status: "La liste des inclinaisons n'a pas pu être récupérée !" });
        }
    });

router.route("/getByPosition/:id")
    .get(async (req, res) => {

        const listeReponses = await pool.query(
            'SELECT * FROM reponses WHERE position_id = $1',
            [req.params.id]
        );

        if (listeReponses.rowCount > 0) {
            return res.json({ Succes: true, reponses: listeReponses.rows });
        } else {
            return res.json({ Succes: false, status: "La liste des reponses n'a pas pu être récupérée !" });
        }
    });

router.route("/getById/:id")
    .get(async (req, res) => {

        const listeReponses = await pool.query(
            'SELECT * FROM reponses WHERE reponse_id = $1',
            [req.params.id]
        );

        if (listeReponses.rowCount > 0) {
            return res.json({ Succes: true, reponses: listeReponses.rows });
        } else {
            return res.json({ Succes: false, status: "La liste des reponses n'a pas pu être récupérée !" });
        }
    });

router.route("/getCohortes")
    .get(async (req, res) => {

        const listeCohorte = await pool.query(
            'SELECT DISTINCT cohorte FROM users WHERE id IN (SELECT user_id FROM reponses) ORDER BY cohorte ASC',
            []
        );

        if (listeCohorte.rowCount > 0) {
            return res.json({ Succes: true, reponses: listeCohorte.rows });
        } else {
            return res.json({ Succes: false, status: "La liste des reponses n'a pas pu être récupérée !" });
        }
    });

router.route("/getByCohorte/:cohorte/:difficulte")
    .get(async (req, res) => {
        const { cohorte, difficulte } = req.params;
        // Vérifiez si les paramètres sont présents
        if (!cohorte || !difficulte) {
            return res.status(400).json({ success: false, status: "Les paramètres cohorte et difficulte sont requis." });
        }

        const listeResultats = await pool.query(
            'SELECT * FROM reponses WHERE difficulte = $1 AND user_id IN (SELECT id FROM users WHERE cohorte = $2)',
            [difficulte, cohorte]
        );

        if (listeResultats.rowCount > 0) {
            return res.json({ Succes: true, reponses: listeResultats.rows });
        } else {
            return res.json({ Succes: false, status: "La liste des reponses n'a pas pu être récupérée !" });
        }
    });

router.post('/upload', async (req, res) => {
    try {
        await validateFormReponse(req, res);

        const newReponse = await pool.query(
            'INSERT INTO reponses (user_id, position_id, inclinaison_id, ennonce, nom, abreviation, schema1_angle, schema1_inclinaison, schema2_angle, schema2_inclinaison, schema3_id, schema4_id, corr_nom, corr_abreviation, corr_schema1_angle, corr_schema1_inclinaison, corr_schema2_angle, corr_schema2_inclinaison, corr_schema3_id, corr_schema4_id, remarque_nom, remarque_abreviation, remarque_schema1_angle, remarque_schema1_inclinaison, remarque_schema2_angle, remarque_schema2_inclinaison, remarque_schema3_id, remarque_schema4_id, dificulte) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29) RETURNING *',
            [, req.body.user_id, req.body.position_id, req.body.inclinaison_id, req.body.ennonce, req.body.nom, req.body.abreviation, req.body.schema1_angle, req.body.schema1_inclinaison, req.body.schema2_angle, req.body.schema2_inclinaison, req.body.schema3_id, req.body.schema4_id, req.body.corr_nom, req.body.corr_abreviation, req.body.corr_schema1_angle, req.body.corr_schema1_inclinaison, req.body.corr_schema2_angle, req.body.corr_schema2_inclinaison, req.body.corr_schema3_id, req.body.corr_schema4_id, req.body.remarque_nom, req.body.remarque_abreviation, req.body.remarque_schema1_angle, req.body.remarque_schema1_inclinaison, req.body.remarque_schema2_angle, req.body.remarque_schema2_inclinaison, req.body.remarque_schema3_id, req.body.remarque_schema4_id, req.boody.dificulte]
        );

        return res.json({ Succes: true, reponse: newReponse.rows[0] });
    } catch (error) {
        return res.json({ Succes: false, status: error.message });
    }
});


module.exports = router;