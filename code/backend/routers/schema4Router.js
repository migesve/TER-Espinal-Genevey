const express = require('express');
const router = express.Router();
const Yup = require('yup');
const pool = require('../db');
const validateFormSchema = require('../controllers/validateFormSchema');

router
    .route("/getAll")
    .get(async (req, res) => {

        const listeSchema4 = await pool.query(
            'SELECT * FROM schema4',
            []
        );

        if (listeSchema4.rowCount > 0) {
            return res.json({ Succes: true, schemas4: listeSchema4.rows });
        } else {
            return res.json({ Succes: false, status: "La liste des schema4 n'a pas pu être récupérée !" });
        }
    });

router
    .route("/getByIds/:position_id/:inclinaison_id")
    .get(async (req, res) => {

        try {
            const { position_id, inclinaison_id } = req.params;

            // Assurez-vous que les paramètres sont valides (optionnel, selon vos besoins)
            if (!position_id || !inclinaison_id) {
                return res.status(400).json({ Succes: false, status: "Invalid parameters" });
            }

            const listeSchema4 = await pool.query(
                'SELECT * FROM schema4 WHERE position_id = $1 AND inclinaison_id = $2',
                [req.params.position_id, req.params.inclinaison_id]
            );

            if (listeSchema4.rowCount > 0) {
                return res.json({ Succes: true, Schemas4: listeSchema4.rows });
            } else {
                return res.json({ Succes: false, status: "La liste des schema4 n'a pas pu être récupérée !" });
            }
        } catch (error) {
            console.error('Error executing query', error);
            return res.status(500).json({ Succes: false, status: "Erreur serveur" });
        }
    });


router
    .route("/getByIncl/:inclinaison_id")
    .get(async (req, res) => {

        try {
            const { inclinaison_id } = req.params;

            // Assurez-vous que les paramètres sont valides (optionnel, selon vos besoins)
            if (!inclinaison_id) {
                return res.status(400).json({ Succes: false, status: "Invalid parameters" });
            }

            const listeSchema4 = await pool.query(
                'SELECT * FROM schema4 WHERE inclinaison_id = $1 ORDER BY angle ASC',
                [req.params.inclinaison_id]
            );

            if (listeSchema4.rowCount > 0) {
                return res.json({ Succes: true, Schemas4: listeSchema4.rows });
            } else {
                return res.json({ Succes: false, status: "La liste des schema4 n'a pas pu être récupérée !" });
            }
        } catch (error) {
            console.error('Error executing query', error);
            return res.status(500).json({ Succes: false, status: "Erreur serveur" });
        }
    });


router
    .route("/getByAngle/:position_id/:inclinaison_id/:angle")
    .get(async (req, res) => {

        try {
            const { position_id, inclinaison_id, angle } = req.params;

            // Assurez-vous que les paramètres sont valides (optionnel, selon vos besoins)
            if (!position_id || !inclinaison_id || !angle) {
                return res.status(400).json({ Succes: false, status: "Invalid parameters" });
            }

            const listeSchema4 = await pool.query(
                'SELECT * FROM schema4 WHERE position_id = $1 AND inclinaison_id = $2 AND angle = $3',
                [req.params.position_id, req.params.inclinaison_id, req.params.angle]
            );
            console.log(listeSchema4);
            if (listeSchema4.rowCount > 0) {
                console.log('OK', listeSchema4.rows);
                return res.json({ Succes: true, Schemas4: listeSchema4.rows });
            } else {
                console.log('not KO', listeSchema4.rows);
                return res.json({ Succes: false, status: "La liste des schema4 n'a pas pu être récupérée ou est vide !", Schemas4: listeSchema4.rows });
            }
        } catch (error) {
            console.error('Error executing query', error);
            return res.status(500).json({ Succes: false, status: "Erreur serveur" });
        }
    });


    router.post('/upload', async (req, res) => {
        try {
            await validateFormSchema(req, res);
    
            const existingSchema4 = await pool.query(
                'SELECT schemas4_id FROM schemas4 WHERE image_name = $1 OR image_path = $2',
                [req.body.image_name, req.body.image_path]
            );
    
            if (existingSchemas4.rowCount == 0) {
                const newSchemas4Query = await pool.query(
                    'Insert INTO schemas4 (image_name, image_path, position_id, inclinaison_id, angle) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                    [req.body.image_name, req.body.image_path, position_id, inclinaison_id, angle]
                );
                return res.json({ Succes: true, schemas4_id: newSchemas4Query.rows[0].schemas4_id, image_name: newSchemas4Query.rows[0].image_name, image_path: newSchemas4Query.rows[0].position_id, inclinaison_id: newSchemas4Query.rows[0].inclinaison_id });
            }
            else {
                return res.json({ Succes: false, status: "Le schema existe déjà !" });
            }
        } catch (err) {
            console.error(err);
        }
    });

module.exports = router;