const express = require('express');
const router = express.Router();
const Yup = require('yup');
const pool = require('../db');

router
    .route("/getAll")
    .get(async (req, res) => {

        const listeSchema4 = await pool.query(
            'SELECT * FROM schema4',
            []
        );
        console.log(listeSchema4.rows);

        if (listeSchema4.rowCount > 0) {
            res.json({ Succes: true, schemas4: listeSchema4.rows });
        } else {
            res.json({ Succes: false, status: "La liste des schema4 n'a pas pu être récupérée !" });
        }
    });

router
    .route("/getByIds")
    .get(async (req, res) => {

        const listeSchema4 = await pool.query(
            'SELECT * FROM schema4 WHERE position_id = $1 AND inclinaison_id = $2',
            [req.body.position_id, req.body.inclinaison_id]
        );
        console.log(listeSchema4.rows);

        if (listeSchema4.rowCount > 0) {
            res.json({ Succes: true, Schemas4: listeSchema4.rows });
        } else {
            res.json({ Succes: false, status: "La liste des schema4 n'a pas pu être récupérée !" });
        }
    });


router.post('/upload', async (req, res) => {
    try {
        await validateFormSchema(req, res);

        const existingSchema4 = await pool.query(
            'SELECT schema4_id FROM schema4 WHERE image_name = $1 OR image_path = $2',
            [req.body.image_name, 'src/images/schema4/' + req.body.image_name]
        );

        if (existingSchema4.rowCount == 0) {
            const newSchema4Query = await pool.query(
                'Insert INTO schema4 (image_name, image_path, position_id, inclinaison_id) VALUES ($1, $2, $3, $4) RETURNING *',
                [req.body.image_name, 'src/images/schema4/' + req.body.image_name, position_id, inclinaison_id]
            );
            res.json({ Succes: true, schema4_id: newSchema4Query.rows[0].schema4_id, image_name: newSchema4Query.rows[0].image_name, image_path: newSchema4Query.rows[0].position_id, inclinaison_id: newSchema4Query.rows[0].inclinaison_id });
        }
        else {
            res.json({ Succes: false, status: "Le schema existe déjà !" });
        }
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;