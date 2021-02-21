const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET recipes that meet search query
router.get('/', (req, res) => {
    // if search was more than 1 word, this will split into an array with each word as an element
    const searchArray = req.query.string.split(' ');
    // variable to handle query text for multiple words
    let newSearchQuery = '';
    // add the wildcard % before and after each word in array
    for (let i = 0; i < searchArray.length; i++) {
        searchArray[i] = `%${searchArray[i]}%`;
    }
    console.log('searchArray', searchArray);
    // create the sql injection numbers for the query 
    for (let i = 1; i <= searchArray.length; i++) {
        newSearchQuery += `
            ("recipes".name ILIKE $${i} OR 
            "recipes".description ILIKE $${i} OR
            "recipes".tags ILIKE $${i} OR
            "ingredients".name ILIKE $${i}) AND`
    }
    // take off the last AND
    newSearchQuery = newSearchQuery.slice(0, -4);
    console.log('newSearchQuery after slice:', newSearchQuery);
    // plug query text with the $numbers into the sql query
    const searchQuery = `
        SELECT "recipes".id, "recipes".name, "recipes".tags, "recipes".chef_grade, "recipes".photo FROM "recipes" 
        LEFT JOIN "ingredients" on "recipes".id = "ingredients".recipe_id
        WHERE ${newSearchQuery}
        GROUP BY "recipes".id;
    `;
    pool.query(searchQuery, [...searchArray])
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: search recipes', err);
            res.sendStatus(500)
        })

});

module.exports = router;