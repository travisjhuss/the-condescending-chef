const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// middleware for checking login
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET five most recent recipes from all users
router.get('/fiveAll', rejectUnauthenticated, (req, res) => {
    const getFiveAllRecipesQuery = `
        SELECT * FROM "recipes" 
        ORDER BY "date" DESC
        LIMIT 5; 
        `;
    pool.query(getFiveAllRecipesQuery)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
});


// GET five most recent recipes from logged in user
router.get('/fiveMy', rejectUnauthenticated, (req, res) => {
    const getFiveUserRecipesQuery = `
        SELECT * FROM "recipes" 
        WHERE "user_id" = $1
        ORDER BY "date" DESC
        LIMIT 5;    
        `;
    pool.query(getFiveUserRecipesQuery, [req.user.id]).then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  });
module.exports = router;