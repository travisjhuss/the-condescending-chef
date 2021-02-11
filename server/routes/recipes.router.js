const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
// middleware for checking login
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET details from selected recipe
router.get('/:id', (req, res) => {
    // Get id from req.params
    const id = req.params.id;
    console.log('get details for recipe id:', id);
    const sqlText = `
        SELECT * FROM "recipes"
        WHERE "id" = $1;
        `;
    pool.query(sqlText, [id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
});

// GET genres from selected movie
router.get('/ingredients/:id', (req, res) => {
    // Get id from req.params
    const id = req.params.id;
    console.log('get ingredients for recipe id:', id);
    const sqlText = `
        SELECT "ingredients".id, "ingredients".amount, "ingredients".unit, "ingredients".name FROM "ingredients"
        JOIN "recipes" ON "recipes".id = "ingredients".recipe_id
        WHERE "recipes".id = $1;
        `;
    pool.query(sqlText, [id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
});

module.exports = router;