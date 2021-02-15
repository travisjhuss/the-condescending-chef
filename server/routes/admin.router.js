const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// middleware for checking login
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// get all recipes for admin for review
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('/admin GET route');

    const getAllReviewRecipesQuery = `
        SELECT * FROM "recipes" 
        WHERE "marked_for_review" = true;
        `;
    pool.query(getAllReviewRecipesQuery).then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;